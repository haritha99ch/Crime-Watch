import { Schema } from "mongoose";
import File from "./File";
import Status from "../Enums/Status";
import Location from "./Location";

class Evidence {
    Author!: Schema.Types.ObjectId;
    Caption!: string;
    Body!: string;
    Date!: Date;
    Location!: Location;
    Files!: File[];
    Status!: Status;
    Moderator?: Schema.Types.ObjectId;
    ModeratorNote?: string;
}
export default Evidence;
export interface EvidenceDocument extends Evidence, Document {}
