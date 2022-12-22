import { Document, Schema } from "mongoose";
import Status from "../Enums/Status";
import Evidence from "./Evidence";
import File from "./File";
import Location from "./Location";
import Moderator from "./Moderator";
import Witness from "./Witness";

class Report {
    Author!: Schema.Types.ObjectId | (Witness & { _id: string });
    Caption!: string;
    Body!: string;
    Date!: Date;
    Location!: Location;
    Categories!: string[];
    File!: File;
    Evidences?:
        | Schema.Types.ObjectId[]
        | (Evidence[] & { _id: string })
        | number;
    Status!: Status;
    Moderator?: Schema.Types.ObjectId | (Moderator & { _id: string });
    ModeratorNote?: string;
}
export default Report;
export interface ReportDocument extends Report, Document {}
