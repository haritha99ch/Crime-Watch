import User from "./User";
import { Document } from "mongoose";

class Witness {
    User!: User;
}
export default Witness;
export interface WitnessDocument extends Witness, Document {}
