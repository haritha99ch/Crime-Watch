import IAccount from "./IAccount";

interface IUser {
    FirstName: string;
    LastName: string;
    DOB: Date;
    Age: number;
    PhoneNumber: number;
    Account: IAccount;
}
export default IUser;
export interface UserDocument extends IUser, Document {}
