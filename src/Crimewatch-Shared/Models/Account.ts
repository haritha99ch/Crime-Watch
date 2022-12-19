class Account {
    Email!: string;
    Password!: string;
    IsModerator!: boolean;
}
export default Account;
export interface AccountDocument extends Account, Document {}
