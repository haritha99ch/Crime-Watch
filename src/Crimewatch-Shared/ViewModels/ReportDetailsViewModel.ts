import Report from "../Models/Report";
import Witness from "../Models/Witness";
import Moderator from "../Models/Moderator";

interface ReportDetailsViewModel extends Omit<Report, "Author" | "Moderator"> {
    _id: string;
    Author: Witness & { _id: string };
    Moderator: Moderator & { _id: string };
}
export default ReportDetailsViewModel;
