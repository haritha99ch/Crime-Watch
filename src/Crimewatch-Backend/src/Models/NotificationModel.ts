import { Schema, model } from "mongoose";
import { NotificationDocument } from "crimewatch-shared/Models/Notification";

const NotificationSchema: Schema = new Schema<NotificationDocument>({
    ReportId: {
        type: String,
        required: true,
    },
    Message: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        required: true,
    },
    Seen: {
        type: Boolean,
        required: true,
        default: false,
    },
});

export default model<NotificationDocument>("Notification", NotificationSchema);
