import Province from "../Enums/Province";
import IUser from "./IUser";

interface IModerator {
    PoliceId: string;
    User: IUser;
    Province: Province;
}
export default IModerator;
export interface ModeratorDocument extends IModerator, Document {}
