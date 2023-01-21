import { Schema, model } from "mongoose";
import { ModeratorDocument } from "../../../Crimewatch-Shared/Models/Moderator";
import UserModel from "./UserModel";
import mongooseAutopopulate from "mongoose-autopopulate";
import NotificationModel from "./NotificationModel";

const ModeratorSchema: Schema = new Schema<ModeratorDocument>({
    User: {
        type: UserModel.schema,
        required: true,
    },
    Notifications: [NotificationModel.schema],
    PoliceId: {
        type: String,
        required: true,
    },
    Province: {
        type: String,
        required: true,
    },
});
export default model<ModeratorDocument>(
    "Moderator",
    ModeratorSchema.plugin(mongooseAutopopulate)
);
