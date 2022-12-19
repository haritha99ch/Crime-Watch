import { getModelForClass, prop } from "@typegoose/typegoose";
import IUser from "crimewatch-shared/Models/IUser";
import Account, { AccountModel } from "./Account";

class User implements IUser {
    @prop({ required: true })
    public FirstName!: string;
    @prop({ required: true })
    public LastName!: string;
    @prop({ required: true })
    public DOB!: Date;
    @prop({ required: true })
    public Age!: number;
    @prop({ required: true })
    public PhoneNumber!: number;
    @prop({ required: true })
    public Account!: Account;
}
export default User;
export const UserModel = getModelForClass(User);
