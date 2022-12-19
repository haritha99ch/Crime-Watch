interface IAccount {
    Email?: string;
    Password: string;
    IsModerator: boolean;
}
export default IAccount;
export interface AccountDocument extends IAccount, Document {}
