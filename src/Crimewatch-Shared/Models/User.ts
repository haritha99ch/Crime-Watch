import Account from "./Account";
import { Document } from "mongoose";

class User {
    FirstName!: string;
    LastName!: string;
    DOB!: Date;
    Age!: number;
    PhoneNumber!: number;
    Account!: Account;
}
export default User;
export interface UserDocument extends User, Document {}
