import Report from "../Models/Report";
import Witness from "../Models/Witness";
import Moderator from "../Models/Moderator";
import ReportViewModel from "./ReportViewModel";
import Evidence from "../Models/Evidence";

class ReportDetailsViewModel extends ReportViewModel {
    Evidences?: (Evidence[] & { _id: string });
}
export default ReportDetailsViewModel;
