import Evidence, { EvidenceDocument } from "crimewatch-shared/Models/Evidence";
import { ReportDocument } from "crimewatch-shared/Models/Report";
import { BooleanExpression, UpdateQuery } from "mongoose";
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
        return newEvidence;
    }
    public async RemoveEvidence(
        reportId: string,
        evidenceId: string
    ): Promise<BooleanExpression> {
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
