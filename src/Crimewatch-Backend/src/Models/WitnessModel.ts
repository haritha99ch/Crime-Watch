import { WitnessDocument } from "crimewatch-shared/Models/Witness";
import { Schema, model } from "mongoose";
import UserModel from "./UserModel";

const WitnessSchema: Schema = new Schema<WitnessDocument>({
    User: {
        type: UserModel.schema,
        required: true,
    },
});
export default model<WitnessDocument>("Witness", WitnessSchema);
