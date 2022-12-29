import { WitnessDocument } from "crimewatch-shared/Models/Witness";
import { Schema, model } from "mongoose";
import UserModel from "./UserModel";
import mongooseAutopopulate from "mongoose-autopopulate";

const WitnessSchema: Schema = new Schema<WitnessDocument>({
    User: {
        type: UserModel.schema,
        required: true,
    },
    Notifications: [
        {
            type: Schema.Types.ObjectId,
            ref: "Notification",
            autopopulate: true,
        },
    ],
});
export default model<WitnessDocument>(
    "Witness",
    WitnessSchema.plugin(mongooseAutopopulate)
);
