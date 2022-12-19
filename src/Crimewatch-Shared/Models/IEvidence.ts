import { Schema } from "mongoose";
import IFile from "./IFile";
import Status from "../Enums/Status";
import ILocation from "./ILocation";
import { Ref } from "@typegoose/typegoose";
import IWitness from "./IWitness";
import IModerator from "./IModerator";

interface IEvidence {
    Author: Ref<IWitness>;
    Caption: string;
    Body: string;
    Date: Date;
    Location: ILocation;
    Files: IFile[];
    Status: Status;
    Moderator?: Ref<IModerator>;
    ModeratorNote?: string;
}
export default IEvidence;
export interface EvidenceDocument extends IEvidence, Document {}
