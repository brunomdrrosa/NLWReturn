import { MailAdapter, SendMailData } from '../mailAdapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'fd050f2f419fbe',
    pass: '85ca40293e0f24',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <contato@feedget.com>',
      to: 'Bruno Machado <brunomdr46@gmail.com>',
      subject,
      html: body,
    });
  }
}
