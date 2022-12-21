import { LocationDocument } from "crimewatch-shared/Models/Location";
import { Schema, model } from "mongoose";

const LocationSchema: Schema = new Schema<LocationDocument>({
    No: {
        type: String,
    },
    Street1: {
        type: String,
        required: true,
    },
    Street2: {
        type: String,
    },
    Street3: {
        type: String,
    },
    City: {
        type: String,
        required: true,
    },
    Province: {
        type: String,
        required: true,
    },
});

export default model<LocationDocument>("Location", LocationSchema);
