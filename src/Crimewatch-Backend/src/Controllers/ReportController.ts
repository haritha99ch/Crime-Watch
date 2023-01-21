import Report, {
    ReportDocument,
} from "../../../Crimewatch-Shared/Models/Report";
import { Request, Response, NextFunction } from "express";
import ReportModel from "../Models/ReportModel";
import IRepository from "../Services/IRepository";
import ModeratorReportService from "../Services/ModeratorReportService";
import ReportService from "../Services/ReportService";
import Repository from "../Services/Repository";

class ReportController {
    private readonly _reportRepository: IRepository<ReportDocument>;
    private readonly moderatorReportService: ModeratorReportService;
    private readonly reportService: ReportService;
    constructor() {
        this._reportRepository = new Repository<ReportDocument>(ReportModel);
        this.moderatorReportService = new ModeratorReportService();
        this.reportService = new ReportService();
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
    public async BeModeratorById(
        request: Request<{ moderatorId: string; reportId: string }>,
        response: Response<ReportDocument>,
        next: NextFunction
    ) {
        const report = await this.moderatorReportService.BeModerator(
            request.params.moderatorId,
            request.params.reportId
        );
        return response.send(report);
    }
    public async ApproveById(
        request: Request<{ reportId: string }>,
        response: Response<boolean>,
        next: NextFunction
    ) {
        const reportApproved = await this.moderatorReportService.Approve(
            request.params.reportId
        );
        return response.send(reportApproved);
    }
    public async DeclineById(
        request: Request<{ reportId: string }>,
        response: Response<boolean>,
        next: NextFunction
    ) {
        const reportDeclined = await this.moderatorReportService.Decline(
            request.params.reportId
        );
        return response.send(reportDeclined);
    }
    public async RereviewById(
        request: Request<{ reportId: string }>,
        response: Response<boolean>,
        next: NextFunction
    ) {
        const reportRereviewing = await this.moderatorReportService.Rereview(
            request.params.reportId
        );
        return response.send(reportRereviewing);
    }
    public async Star(
        request: Request<{ reportId: string; witnessId: string }>,
        response: Response<boolean>,
        next: NextFunction
    ) {
        const stared = await this.reportService.StarReport(
            request.params.reportId,
            request.params.witnessId
        );
        return response.send(stared);
    }
}
export default ReportController;
