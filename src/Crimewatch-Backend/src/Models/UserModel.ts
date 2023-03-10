import { model, Schema } from "mongoose";
import { UserDocument } from "../../../Crimewatch-Shared/Models/User";
import AccountModel from "./AccountModel";
import mongooseAutopopulate from "mongoose-autopopulate";

const UserSchema: Schema = new Schema<UserDocument>({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    Gender: {
        type: String,
        required: true,
    },
    DOB: {
        type: Date,
        required: true,
    },
    Age: {
        type: Number,
        required: true,
    },
    PhoneNumber: {
        type: Number,
        required: true,
    },
    Account: {
        type: AccountModel.schema,
        required: true,
    },
});
export default model<UserDocument>(
    "User",
    UserSchema.plugin(mongooseAutopopulate)
);
