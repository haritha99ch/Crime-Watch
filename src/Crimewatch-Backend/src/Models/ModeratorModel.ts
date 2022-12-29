import { Schema, model } from "mongoose";
import { ModeratorDocument } from "crimewatch-shared/Models/Moderator";
import UserModel from "./UserModel";
import mongooseAutopopulate from "mongoose-autopopulate";

const ModeratorSchema: Schema = new Schema<ModeratorDocument>({
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
    PoliceId: {
        type: String,
        required: true,
    },
    Province: {
        type: String,
        required: true,
    },
});
export default model<ModeratorDocument>("Moderator", ModeratorSchema.plugin(mongooseAutopopulate));
