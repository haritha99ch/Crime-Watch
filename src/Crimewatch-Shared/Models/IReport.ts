import { Ref } from "@typegoose/typegoose";
import { Document, Schema } from "mongoose";
import Status from "../Enums/Status";
import IEvidence from "./IEvidence";
import IFile from "./IFile";
import ILocation from "./ILocation";
import IModerator from "./IModerator";
import IWitness from "./IWitness";

export interface IReport {
    Author: Ref<IWitness>;
    Caption: string;
    Body: string;
    Date: Date;
    Location: ILocation;
    Categories: string[];
    File: IFile;
    Evidences?: IEvidence[];
    Status: Status;
    Moderator?: Ref<IModerator>;
    ModeratorNote?: string;
}
export default IReport;
export interface ReportDocument extends IReport, Document {}
