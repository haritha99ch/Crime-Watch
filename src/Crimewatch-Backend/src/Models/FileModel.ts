import { model, Schema } from "mongoose";
import { FileDocument } from "crimewatch-shared/Models/File";

const FileSchema: Schema = new Schema<FileDocument>({
    File: {
        type: String,
        required: true,
    },
    Type: {
        type: String,
    },
});
export default model<FileDocument>("File", FileSchema);
