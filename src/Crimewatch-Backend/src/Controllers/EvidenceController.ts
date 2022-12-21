import ReportEvidenceService from "../Services/ReportEvidenceService";
import { Request, Response, NextFunction } from "express";
import Evidence, { EvidenceDocument } from "crimewatch-shared/Models/Evidence";

class EvidenceController {
    private readonly reportEvidenceService: ReportEvidenceService;
    constructor() {
        this.reportEvidenceService = new ReportEvidenceService();
    }

    public async CreateForReport(
        request: Request<{ reportId: string }, {}, Evidence>,
        response: Response<EvidenceDocument>,
        next: NextFunction
    ) {
        const evidence =
            await this.reportEvidenceService.AddNewEvidenceToReport(
                request.params.reportId,
                request.body
            );
        return response.send(evidence);
    }
    public async GetAllForReport(
        request: Request<{ reportId: string }>,
        response: Response<EvidenceDocument[]>,
        next: NextFunction
    ) {
        const evidences =
            await this.reportEvidenceService.GetAllEvidenceForReport(
                request.params.reportId
            );
        return response.send(evidences);
    }
    public async RemoveFromReport(
        request: Request<{ reportId: string; evidenceId: string }>,
        response: Response<EvidenceDocument[]>,
        next: NextFunction
    ) {
        const evidenceDeleted = await this.reportEvidenceService.RemoveEvidence(
            request.params.reportId,
            request.params.evidenceId
        );
        return response.send(evidenceDeleted);
    }
}
export default EvidenceController;
