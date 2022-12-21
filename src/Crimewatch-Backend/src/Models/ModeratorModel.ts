import { Schema, model } from "mongoose";
import { ModeratorDocument } from "crimewatch-shared/Models/Moderator";
import UserModel from "./UserModel";

const ModeratorSchema: Schema = new Schema<ModeratorDocument>({
    User: {
        type: UserModel.schema,
        required: true,
    },
    PoliceId: {
        type: String,
        required: true,
    },
    Province: {
        type: String,
        required: true,
    },
});
export default model<ModeratorDocument>("Moderator", ModeratorSchema);
