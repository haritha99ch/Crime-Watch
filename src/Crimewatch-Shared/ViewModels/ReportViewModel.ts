import { Schema } from "mongoose";
import Evidence from "../Models/Evidence";
import Moderator from "../Models/Moderator";
import Report from "../Models/Report";
import Witness from "../Models/Witness";
import EvidenceViewModel from "./EvidenceViewModel";

class ReportViewModel extends Report {
    _id?: string;
    override Author!: Witness & { _id: string };
    override Evidences?: EvidenceViewModel[] | Schema.Types.ObjectId[];
    override Moderator?: Moderator & { _id: Schema.Types.ObjectId };
}
export default ReportViewModel;
