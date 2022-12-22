import Evidence from "../Models/Evidence";
import Moderator from "../Models/Moderator";
import Report from "../Models/Report";
import Witness from "../Models/Witness";

class ReportViewModel extends Report {
    _id!: string;
    Author!: Witness & { _id: string };
    Evidences?: number | (Evidence[] & { _id: string }) = 0;
    Moderator?: Moderator & { _id: string };
}
export default ReportViewModel;
