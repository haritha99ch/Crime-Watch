import Status from "../../../Crimewatch-Shared/Enums/Status";
import { ReportDocument } from "../../../Crimewatch-Shared/Models/Report";
import { Schema, model } from "mongoose";
import EvidenceModel from "./EvidenceModel";
import LocationModel from "./LocationModel";
import ModeratorModel from "./ModeratorModel";
import mongooseAutopopulate from "mongoose-autopopulate";
import FileModel from "./FileModel";

const ReportSchema: Schema = new Schema<ReportDocument>({
    Author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Witness",
        autopopulate: true,
    },
    Caption: {
        type: String,
        required: true,
    },
    Body: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        required: true,
    },
    Location: {
        type: LocationModel.schema,
        required: true,
    },
    Categories: {
        type: [String],
        required: true,
    },
    File: {
        type: FileModel.schema,
        required: true,
    },
    Evidences: {
        type: [Schema.Types.ObjectId],
        default: [],
        required: true,
    },
    Status: {
        type: String,
        required: true,
        default: Status.Pending,
    },
    Moderator: {
        type: Schema.Types.ObjectId,
        ref: "Moderator",
        required: false,
        autopopulate: true,
    },
    Stared: {
        type: [Schema.Types.ObjectId],
        default: [],
    },
    ModeratorNote: {
        type: String,
    },
});

export default model<ReportDocument>(
    "Report",
    ReportSchema.plugin(mongooseAutopopulate)
);
