import User from "./User";
import Notification from "./Notification";
import { Document, Schema } from "mongoose";

class Witness {
    User!: User;
    Notifications?: any[];
}
export default Witness;
export interface WitnessDocument extends Witness, Document {}
