import { getModelForClass, prop } from "@typegoose/typegoose";
import Province from "crimewatch-shared/Enums/Province";
import IModerator from "crimewatch-shared/Models/IModerator";
import IUser from "crimewatch-shared/Models/IUser";
import User from "./User";

class Moderator implements IModerator {
    @prop({ required: true })
    public PoliceId!: string;
    @prop({ required: true })
    public User!: User;
    @prop({ required: true })
    public Province!: Province;
}
export default Moderator;
export const ModeratorModel = getModelForClass(Moderator);
