import IUser from "./IUser";

interface IWitness {
    User: IUser;
}
export default IWitness;
export interface WitnessDocument extends IWitness, Document {}
