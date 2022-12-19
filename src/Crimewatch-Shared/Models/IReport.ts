import { Document, Schema } from "mongoose";
import Status from "../Enums/Status";
import IEvidence from "./IEvidence";
import IFile from "./IFile";
import ILocation from "./ILocation";

export interface IReport {
    Author: Schema.Types.ObjectId;
    Caption: string;
    Body: string;
    Date: Date;
    Location: ILocation;
    Categories: string[];
    File: IFile;
    Evidences: IEvidence[];
    Status: Status;
    Moderator: Schema.Types.ObjectId;
    ModeratorNote: string;
}
export default IReport;
export interface ReportDocument extends IReport, Document {}
