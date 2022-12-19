import { Schema } from "mongoose";
import IFile from "./IFile";
import Status from "../Enums/Status";
import ILocation from "./ILocation";

interface IEvidence {
    Author: Schema.Types.ObjectId;
    Caption: string;
    Body: string;
    Date: Date;
    Location: ILocation;
    Files: IFile[];
    Status: Status;
    Moderator?: Schema.Types.ObjectId;
    ModeratorNote?: string;
}
export default IEvidence;
export interface EvidenceDocument extends IEvidence, Document {}
