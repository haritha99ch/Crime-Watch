import Evidence, {
    EvidenceDocument,
} from "../../../Crimewatch-Shared/Models/Evidence";
import { ReportDocument } from "../../../Crimewatch-Shared/Models/Report";
import { FilterQuery, UpdateQuery } from "mongoose";
import EvidenceModel from "../Models/EvidenceModel";
import ReportModel from "../Models/ReportModel";
import IRepository from "./IRepository";
import Repository from "./Repository";

class ReportEvidenceService {
    private readonly _reportRepository: IRepository<ReportDocument>;
    private readonly _evidenceRepository: IRepository<EvidenceDocument>;
    constructor() {
        this._reportRepository = new Repository<ReportDocument>(ReportModel);
        this._evidenceRepository = new Repository<EvidenceDocument>(
            EvidenceModel
        );
    }

    public async AddNewEvidenceToReport(
        reportId: string,
        evidence: Evidence
    ): Promise<EvidenceDocument> {
        const newEvidence = await this._evidenceRepository.Create(evidence);
        const update: UpdateQuery<ReportDocument> = {
            $push: { Evidences: newEvidence._id },
        };
        const report = await this._reportRepository.UpdateById(
            reportId,
            update
        );
        console.log(reportId);
        return newEvidence;
    }
    public async GetAllEvidenceForReport(
        reportId: string
    ): Promise<EvidenceDocument[]> {
        const evidencesIds = await (
            await this._reportRepository.GetById(reportId)
        ).Evidences;
        const filter: FilterQuery<EvidenceDocument> = {
            _id: { $in: evidencesIds },
        };
        const evidences = await this._evidenceRepository.GetAllByFilter(filter);
        return evidences;
    }
    public async RemoveEvidence(
        reportId: string,
        evidenceId: string
    ): Promise<boolean> {
        const update: UpdateQuery<ReportDocument> = {
            $pull: { Evidences: evidenceId },
        };
        const report = await this._reportRepository.UpdateById(
            reportId,
            update
        );
        const evidenceDeleted = await this._evidenceRepository.DeleteById(
            evidenceId
        );
        return evidenceDeleted;
    }
}
export default ReportEvidenceService;
