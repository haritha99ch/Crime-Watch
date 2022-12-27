import { model, Schema } from "mongoose";
import { UserDocument } from "crimewatch-shared/Models/User";
import AccountModel from "./AccountModel";
import NotificationModel from "./NotificationModel";

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
    Notifications: {
        type: [NotificationModel.schema],
    },
});
export default model<UserDocument>("User", UserSchema);
