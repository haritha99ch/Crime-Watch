import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import Status from "crimewatch-shared/Enums/Status";
import IEvidence from "crimewatch-shared/Models/IEvidence";
import Moderator from "./Moderator";
import Location from "./Location";
import Witness from "./Witness";
import File from "./File";

class Evidence implements IEvidence {
    @prop({ required: true, type: () => Witness })
    public Author!: Ref<Witness>;
    @prop({ required: true })
    public Caption!: string;
    @prop({ required: true })
    public Body!: string;
    @prop({ required: true })
    public Date!: Date;
    @prop({ required: true })
    public Location!: Location;
    @prop({ required: true })
    public Files!: File[];
    @prop({ required: true, default: Status.Pending })
    public Status!: Status;
    @prop({type: ()=> Moderator})
    public Moderator?: Ref<Moderator>;
    @prop()
    public ModeratorNote?: string;
}
export default Evidence;
export const EvidenceModel = getModelForClass(Evidence);
