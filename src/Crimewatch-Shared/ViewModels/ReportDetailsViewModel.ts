import Report from "../Models/Report";
import Witness from "../Models/Witness";
import Moderator from "../Models/Moderator";
import ReportViewModel from "./ReportViewModel";
import Evidence from "../Models/Evidence";
import { Schema } from "mongoose";
import EvidenceViewModel from "./EvidenceViewModel";

export class ReportDetailsViewModel extends ReportViewModel {
    constructor(){
        super();
    }
    override Evidences?: EvidenceViewModel[];
}
export default ReportDetailsViewModel;
