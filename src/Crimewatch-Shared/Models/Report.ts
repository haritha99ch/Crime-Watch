import { Document, Schema } from "mongoose";
import Status from "../Enums/Status";
import EvidenceViewModel from "../ViewModels/EvidenceViewModel";
import Evidence from "./Evidence";
import File from "./File";
import Location from "./Location";
import Moderator from "./Moderator";
import Witness from "./Witness";

class Report {
    Author!: Schema.Types.ObjectId | (Witness & { _id: Schema.Types.ObjectId });
    Caption!: string;
    Body!: string;
    Date!: Date;
    Location!: Location;
    Categories!: string[];
    File!: File;
    Evidences?: Schema.Types.ObjectId[] | String[] | EvidenceViewModel[];
    Status!: Status;
    Moderator?:
        | Schema.Types.ObjectId
        | (Moderator & { _id: Schema.Types.ObjectId });
    ModeratorNote?: string;
}
export default Report;
export interface ReportDocument extends Report, Document {}
