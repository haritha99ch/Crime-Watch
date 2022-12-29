import User from "./User";
import Notification from "./Notification";
import { Document, Schema } from "mongoose";

class Witness {
    User!: User;
    Notifications?: Schema.Types.ObjectId[] | String[] | Notification[];
}
export default Witness;
export interface WitnessDocument extends Witness, Document {}
