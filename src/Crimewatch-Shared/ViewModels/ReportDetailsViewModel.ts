import IReport from "../Models/IReport";
import IWitness from "../Models/IWitness";
import IModerator from "../Models/IModerator";

interface ReportDetailsViewModel extends Omit<IReport, "Author" | "Moderator"> {
    _id: string;
    Author: IWitness & { _id: string };
    Moderator: IModerator & { _id: string };
}
export default ReportDetailsViewModel;
