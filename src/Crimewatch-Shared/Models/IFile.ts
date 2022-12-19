interface IFile {
    Name: string;
    Type: string;
}
export default IFile;
export interface FileDocument extends IFile, Document {}
