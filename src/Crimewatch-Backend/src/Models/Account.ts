import { getModelForClass, prop } from "@typegoose/typegoose";
import IAccount from "crimewatch-shared/Models/IAccount";

class Account implements IAccount {
    @prop({ required: true })
    public Email!: string;
    @prop({ required: true })
    public Password!: string;
    @prop({ required: true, default: false })
    public IsModerator!: boolean;
}
export default Account;
export const AccountModel = getModelForClass(Account);
