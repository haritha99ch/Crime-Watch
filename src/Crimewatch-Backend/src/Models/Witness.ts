import { getModelForClass, prop } from "@typegoose/typegoose";
import IWitness from "crimewatch-shared/Models/IWitness";
import User from "./User";

class Witness implements IWitness {
    @prop({ required: true })
    public User!: User;
}
export default Witness;
export const WitnessModel = getModelForClass(Witness);
