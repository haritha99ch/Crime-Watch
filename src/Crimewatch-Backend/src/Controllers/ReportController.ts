import Report, { ReportDocument } from "crimewatch-shared/Models/Report";
import { Request, Response, NextFunction } from "express";
import ReportModel from "../Models/ReportModel";
import IRepository from "../Services/IRepository";
import Repository from "../Services/Repository";

class ReportController {
    private readonly _reportRepository: IRepository<ReportDocument>;
    constructor() {
        this._reportRepository = new Repository<ReportDocument>(ReportModel);
    }

    public async Create(
        request: Request<{}, {}, Report>,
        response: Response<ReportDocument>,
        next: NextFunction
    ) {
        const report = await this._reportRepository.Create(request.body);
        return response.send(report);
    }
    public async GetAll(
        request: Request,
        response: Response<ReportDocument[]>,
        next: NextFunction
    ) {
        const reports = await this._reportRepository.GetAll();
        return response.send(reports);
    }
    public async GetById(
        request: Request<{ id: string }>,
        response: Response<ReportDocument>,
        next: NextFunction
    ) {
        const report = await this._reportRepository.GetById(request.params.id);
        return response.send(report);
    }
    public async UpdateById(
        request: Request<{ id: string }, {}, Report>,
        response: Response<ReportDocument>,
        next: NextFunction
    ) {
        const upToDateReport = await this._reportRepository.UpdateById(
            request.params.id,
            request.body
        );
        return response.send(upToDateReport);
    }
    public async DeleteById(
        request: Request<{ id: string }>,
        response: Response<boolean>,
        next: NextFunction
    ) {
        const reportDeleted = await this._reportRepository.DeleteById(
            request.params.id
        );
        return response.send(reportDeleted);
    }
}
export default ReportController;
