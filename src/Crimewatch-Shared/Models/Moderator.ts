import Province from "../Enums/Province";
import User from "./User";

class Moderator {
    PoliceId!: string;
    User!: User;
    Province!: Province;
}
export default Moderator;
export interface ModeratorDocument extends Moderator, Document {}
