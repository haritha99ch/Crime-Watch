import { Document } from "mongoose";

class Notification {
    ReportId!: string;
    Message!: string;
    Seen: boolean = false;
}
export default Notification;
export interface NotificationDocument extends Notification, Document {}
