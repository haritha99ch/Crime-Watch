import { WitnessDocument } from "crimewatch-shared/Models/Witness";
import { Schema, model } from "mongoose";
import UserModel from "./UserModel";
import mongooseAutopopulate from "mongoose-autopopulate";
import NotificationModel from "./NotificationModel";

const WitnessSchema: Schema = new Schema<WitnessDocument>({
    User: {
        type: UserModel.schema,
        required: true,
    },
    Notifications: [NotificationModel.schema],
});
export default model<WitnessDocument>(
    "Witness",
    WitnessSchema.plugin(mongooseAutopopulate)
);
