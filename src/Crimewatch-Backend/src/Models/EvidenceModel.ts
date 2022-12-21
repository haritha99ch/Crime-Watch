import { Schema, model } from "mongoose";
import { EvidenceDocument } from "crimewatch-shared/Models/Evidence";
import LocationModel from "./LocationModel";
import ModeratorModel from "./ModeratorModel";
import Status from "crimewatch-shared/Enums/Status";
import FileModel from "./FileModel";
import mongooseAutoPopulate from "mongoose-autopopulate";

const EvidenceSchema: Schema = new Schema<EvidenceDocument>({
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
    Files: {
        type: [FileModel.schema],
    },
    Status: {
        type: String,
        required: true,
        default: Status.Pending,
        autopopulate: true,
    },
    Moderator: {
        type: Schema.Types.ObjectId,
        ref: "Moderator",
        autopopulate: true,
    },
    ModeratorNote: {
        type: String,
    },
});

export default model<EvidenceDocument>(
    "Evidence",
    EvidenceSchema.plugin(mongooseAutoPopulate)
);
