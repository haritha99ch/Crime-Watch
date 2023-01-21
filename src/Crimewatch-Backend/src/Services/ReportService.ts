import { ReportDocument } from "../../../Crimewatch-Shared/Models/Report";
import { FilterQuery, UpdateQuery } from "mongoose";
import ReportModel from "../Models/ReportModel";
import IRepository from "./IRepository";
import Repository from "./Repository";

class ReportService {
    private readonly _reportRepository: IRepository<ReportDocument>;
    constructor() {
        this._reportRepository = new Repository<ReportDocument>(ReportModel);
    }
    public async StarReport(
        reportId: string,
        witnessId: string
    ): Promise<boolean> {
        const update: UpdateQuery<ReportDocument> = {
            $push: { Stared: witnessId },
        };
        const updatedReport = await this._reportRepository.UpdateById(
            reportId,
            update
        );
        return true;
    }
}
export default ReportService;
