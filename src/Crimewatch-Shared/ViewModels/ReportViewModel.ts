import { Schema } from "mongoose";
import Evidence from "../Models/Evidence";
import Moderator from "../Models/Moderator";
import Report from "../Models/Report";
import Witness from "../Models/Witness";

class ReportViewModel extends Report {
    _id?: string;
    override Author!: Witness & { _id: Schema.Types.ObjectId };
    override Evidences?:
        | number
        | (Evidence & { _id: Schema.Types.ObjectId })[]
        | Schema.Types.ObjectId[] = 0;
    override Moderator?: Moderator & { _id: Schema.Types.ObjectId };
}
export default ReportViewModel;
