import Province from "../Enums/Province";
import User from "./User";
import Notification from "./Notification";
import { Document, Schema } from "mongoose";

class Moderator {
    PoliceId!: string;
    User!: User;
    Notifications?: any[];
    Province!: Province;
}
export default Moderator;
export interface ModeratorDocument extends Moderator, Document {}
