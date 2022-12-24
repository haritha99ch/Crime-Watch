import Account from "./Account";
import { Document } from "mongoose";
import Gender from "../Enums/Gender";

class User {
    FirstName!: string;
    LastName!: string;
    Gender!: Gender;
    DOB!: Date;
    Age!: number;
    PhoneNumber!: number;
    Account!: Account;
}
export default User;
export interface UserDocument extends User, Document {}
