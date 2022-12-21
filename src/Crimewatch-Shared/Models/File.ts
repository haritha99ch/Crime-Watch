import { Document } from "mongoose";

class File {
    File!: string;
    Type?: string;
}
export default File;
export interface FileDocument extends File, Document {}
