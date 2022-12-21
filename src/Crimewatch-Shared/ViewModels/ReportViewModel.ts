import Report from "../Models/Report";
import Witness from "../Models/Witness";

interface ReportViewModel extends Omit<Report, "Author" | "Evidences"> {
    _id?: string;
    Author: Witness & { _id?: string };
}
export default ReportViewModel;
