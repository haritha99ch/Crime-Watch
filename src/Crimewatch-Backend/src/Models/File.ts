import { getModelForClass, prop } from "@typegoose/typegoose";
import IFile from "crimewatch-shared/Models/IFile";

class File implements IFile {
    @prop({ required: true })
    public Name!: string;
    @prop({ required: true })
    public Type!: string;
}
export default File;
export const FileModel = getModelForClass(File);
