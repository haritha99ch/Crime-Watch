import IReport from "../Models/IReport";
import IWitness from "../Models/IWitness";

interface ReportViewModel extends Omit<IReport, "Author" | "Evidences"> {
    _id: string;
    Author: IWitness & { _id: string };
}
export default ReportViewModel;
