import { injectable, inject } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(@inject('MailTemplateProvider') private mailTemplateProvider: IMailTemplateProvider) {
        nodemailer.createTestAccount().then(testAccount => {
            // create reusable transporter object using the default SMTP transport
            const transporter = nodemailer.createTransport({
                host: testAccount.smtp.host,
                port: testAccount.smtp.port,
                secure: testAccount.smtp.secure, // true for 465, false for other ports
                auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass, // generated ethereal password
                },
            });

            this.client = transporter;
        });
    }

    public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
        const info = await this.client.sendMail({
            from: {
                name: from?.name || 'Equipe Gobarber',
                address: from?.email || 'equipe@gobarber.com.br',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
}
