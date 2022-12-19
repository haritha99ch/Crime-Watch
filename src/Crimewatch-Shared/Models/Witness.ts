import User from "./User";

class Witness {
    User!: User;
}
export default Witness;
export interface WitnessDocument extends Witness, Document {}
