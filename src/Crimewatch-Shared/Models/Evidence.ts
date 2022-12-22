import { Schema } from "mongoose";
import File from "./File";
import Status from "../Enums/Status";
import Location from "./Location";
import { Document } from "mongoose";
import Witness from "./Witness";
import Moderator from "./Moderator";

class Evidence {
    Author!: Schema.Types.ObjectId | (Witness & { _id: string });
    Caption!: string;
    Body!: string;
    Date!: Date;
    Location!: Location;
    Files!: File[];
    Status!: Status;
    Moderator?: Schema.Types.ObjectId | (Moderator & { _id: string });
    ModeratorNote?: string;
}
export default Evidence;
export interface EvidenceDocument extends Evidence, Document {}
