import Account from "./Account";
import { Document, Schema } from "mongoose";
import Gender from "../Enums/Gender";
import Notification from "./Notification";

class User {
    FirstName!: string;
    LastName!: string;
    Gender!: Gender;
    DOB!: Date;
    Age!: number;
    PhoneNumber!: number;
    Account!: Account;
    Notifications?:
        | (Notification & { _id: string }[])
        | Schema.Types.ObjectId[];
}
export default User;
export interface UserDocument extends User, Document {}
