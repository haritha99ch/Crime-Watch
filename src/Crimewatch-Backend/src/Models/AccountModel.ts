import { model, Schema } from "mongoose";
import { AccountDocument } from "../../../Crimewatch-Shared/Models/Account";

const AccountSchema: Schema = new Schema<AccountDocument>({
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    IsModerator: {
        type: Boolean,
        required: true,
        default: false,
    },
});
export default model<AccountDocument>("Account", AccountSchema);
