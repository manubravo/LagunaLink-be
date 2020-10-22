import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { AuthJWTChecker } from '../../../../Contexts/LLBE/Users/infrastructure/token/AuthJWTChecker';
import { Token } from '../../../../Contexts/LLBE/Users/domain/Token';
import httpStatus from 'http-status';
import { Payload } from '../../../../Contexts/LLBE/Users/domain/Payload';
import { AuthRole } from '../../../../Contexts/LLBE/Users/domain/AuthRole';
import { JobOpeningCreator } from '../../../../Contexts/LLBE/JobOpenings/application/JobOpeningCreator';
import { CreateJobOpeningRequest } from '../../../../Contexts/LLBE/JobOpenings/application/CreateJobOpeningRequest';

export class JobOpeningPostController implements Controller {
  private creator: JobOpeningCreator;
  private authRoleChecker: AuthRole;

  constructor(jobOpenCreator: JobOpeningCreator, authRole: AuthRole) {
    this.creator = jobOpenCreator;
    this.authRoleChecker = authRole;
  }

  async run(req: Request, res: Response) {
    if (req.headers.authorization === null) {
      res.status(httpStatus.PAYMENT_REQUIRED).send();
      return;
    }
    const token = new Token(req.headers.authorization as string);
    const authChecker = new AuthJWTChecker();
    let payload: Payload;
    try {
      payload = authChecker.check(token);
    } catch (e) {
      res.status(402).send({ message: e.message });
      return;
    }

    try {
      this.authRoleChecker.check(payload);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }

    const jobOpenRequest: CreateJobOpeningRequest = {
      company: payload.userId,
      title: req.body.title,
      position: req.body.position,
      conditions: req.body.conditions,
      responsibilities: req.body.responsibilities,
      qualification: req.body.qualification,
      prevExperience: req.body.prevExperience,
    };

    await this.creator.run(jobOpenRequest);

    res.status(201).send();
  }
}