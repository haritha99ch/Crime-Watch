import Status from "../../../Crimewatch-Shared/Enums/Status";
import { ReportDocument } from "../../../Crimewatch-Shared/Models/Report";
import { UpdateQuery } from "mongoose";
import ReportModel from "../Models/ReportModel";
import IRepository from "./IRepository";
import Repository from "./Repository";

class ModeratorReportService {
    private readonly _reportRepository: IRepository<ReportDocument>;
    constructor() {
        this._reportRepository = new Repository<ReportDocument>(ReportModel);
    }

    public async BeModerator(
        moderatorId: string,
        reportId: string
    ): Promise<ReportDocument> {
        const update: UpdateQuery<ReportDocument> = {
            $set: { Moderator: moderatorId, Status: Status.UnderReview },
        };
        const report = await this._reportRepository.UpdateById(
            reportId,
            update
        );
        return report;
    }
    public async Approve(reportId: string): Promise<boolean> {
        const update: UpdateQuery<ReportDocument> = {
            $set: { Status: Status.Approved },
        };
        const reportApproved = await this._reportRepository
            .UpdateById(reportId, update)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
        return reportApproved;
    }
    public async Decline(reportId: string): Promise<boolean> {
        const update: UpdateQuery<ReportDocument> = {
            $set: { Status: Status.Declined },
        };
        const reportDeclined = await this._reportRepository
            .UpdateById(reportId, update)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
        return reportDeclined;
    }
    public async Rereview(reportId: string): Promise<boolean> {
        const update: UpdateQuery<ReportDocument> = {
            $set: { Status: Status.UnderReview },
        };
        const reportRereviewing = await this._reportRepository
            .UpdateById(reportId, update)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
        return reportRereviewing;
    }
    public async ModeratorNote(
        reportId: string,
        note: string
    ): Promise<boolean> {
        const update: UpdateQuery<ReportDocument> = {
            $set: { ModeratorNote: note },
        };
        const reportNoted = await this._reportRepository
            .UpdateById(reportId, update)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
        return reportNoted;
    }
}
export default ModeratorReportService;
