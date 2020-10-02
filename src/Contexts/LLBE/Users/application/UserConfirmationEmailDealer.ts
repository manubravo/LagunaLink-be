import { MailerService } from '../../../Shared/application/mail/MailerService';
import { TokenGenerator } from '../../../Shared/application/encoder/TokenGenerator';
import { User } from '../domain/User';
import { Payload } from '../../../Shared/application/encoder/Payload';
import { Token } from '../../../Shared/application/encoder/Token';
import { Message } from '../../../Shared/application/mail/Message';
import { ConfirmationEmail } from '../domain/ConfirmationEmail';

export class UserConfirmationEmailDealer implements ConfirmationEmail {
  private readonly mailer: MailerService;
  private readonly tokenGenerator: TokenGenerator;

  constructor(mailer: MailerService, generator: TokenGenerator) {
    this.mailer = mailer;
    this.tokenGenerator = generator;
  }

  async sendTo(user: User): Promise<void> {
    const payload: Payload = {
      userId: user.id.value,
      role: user.role.value,
    };
    const token = this.tokenGenerator.run(payload);
    const htmlCode = this.getHtmlCode(token);
    const message = new Message(
      'noreply@lagunalink.edu',
      user.email.value,
      'LagunaLink Account Confirmation',
      htmlCode
    );
    await this.mailer.sendAccountConfirmationMessage(message);
  }

  private getHtmlCode(token: Token) {
    return `<h1>LagunaLink Email Confirmation</h1>To Confirm the account, please click in this link:</br></br><a href="http://localhost:3000/auth/email_verification?token=${token.value}">Confirm Email</a>`;
  }
}