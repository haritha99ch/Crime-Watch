import { Document, Schema } from "mongoose";
import Status from "../Enums/Status";
import Evidence from "./Evidence";
import File from "./File";
import Location from "./Location";

class Report {
    Author!: Schema.Types.ObjectId;
    Caption!: string;
    Body!: string;
    Date!: Date;
    Location!: Location;
    Categories!: string[];
    File!: File;
    Evidences?: Schema.Types.ObjectId[];
    Status!: Status;
    Moderator?: Schema.Types.ObjectId;
    ModeratorNote?: string;
}
export default Report;
export interface ReportDocument extends Report, Document {}
