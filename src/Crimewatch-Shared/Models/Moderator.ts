import Province from "../Enums/Province";
import User from "./User";
import { Document } from "mongoose";

class Moderator {
    PoliceId!: string;
    User!: User;
    Province!: Province;
}
export default Moderator;
export interface ModeratorDocument extends Moderator, Document {}
