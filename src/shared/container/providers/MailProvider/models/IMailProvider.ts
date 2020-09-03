import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
    sendMail(sendMail: ISendMailDTO): Promise<void>;
}
