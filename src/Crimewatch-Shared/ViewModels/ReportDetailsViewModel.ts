import Report from "../Models/Report";
import Witness from "../Models/Witness";
import Moderator from "../Models/Moderator";
import ReportViewModel from "./ReportViewModel";
import Evidence from "../Models/Evidence";
import { Schema } from "mongoose";

class ReportDetailsViewModel extends ReportViewModel {
    override Evidences?: (Evidence & { _id: Schema.Types.ObjectId })[];
}
export default ReportDetailsViewModel;
