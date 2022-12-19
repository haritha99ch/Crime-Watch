import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import Status from "crimewatch-shared/Enums/Status";
import IEvidence from "crimewatch-shared/Models/IEvidence";
import IFile from "crimewatch-shared/Models/IFile";
import ILocation from "crimewatch-shared/Models/ILocation";
import IReport from "crimewatch-shared/Models/IReport";
import Moderator from "./Moderator";
import Witness from "./Witness";

class Report implements IReport {
    @prop({ required: true, type: () => Witness })
    public Author!: Ref<Witness>;
    @prop({ required: true })
    public Caption!: string;
    @prop({ required: true })
    public Body!: string;
    @prop({ required: true })
    public Date!: Date;
    @prop({ required: true })
    public Location!: ILocation;
    @prop({ required: true })
    public Categories!: string[];
    @prop({ required: true })
    public File!: IFile;
    @prop()
    public Evidences?: IEvidence[];
    @prop({ required: true, default: Status.Pending })
    public Status!: Status;
    @prop({ type: () => Moderator })
    public Moderator?: Ref<Moderator>;
    @prop({ required: true })
    public ModeratorNote?: string;
}
export default Report;
export const ReportModel = getModelForClass(Report);
