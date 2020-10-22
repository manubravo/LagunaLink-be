import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { AuthJWTChecker } from '../../../../Contexts/LLBE/Users/infrastructure/token/AuthJWTChecker';
import { Token } from '../../../../Contexts/LLBE/Users/domain/Token';
import httpStatus from 'http-status';
import { Payload } from '../../../../Contexts/LLBE/Users/domain/Payload';
import { AuthRole } from '../../../../Contexts/LLBE/Users/domain/AuthRole';
import { CompanyUpgrader } from '../../../../Contexts/LLBE/Companies/application/CompanyUpgrader';
import { CompanyRequest } from '../../../../Contexts/LLBE/Companies/application/CompanyRequest';

// noinspection SpellCheckingInspection
export class CompanyPutController implements Controller {
  private upgrader: CompanyUpgrader;
  private authRoleChecker: AuthRole;

  constructor(companyUpgrader: CompanyUpgrader, authRole: AuthRole) {
    this.upgrader = companyUpgrader;
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
      return;
    }

    const companyRequest: CompanyRequest = { ...req.body, id: payload.userId };
    await this.upgrader.run(companyRequest);

    res.status(200).send();
  }
}