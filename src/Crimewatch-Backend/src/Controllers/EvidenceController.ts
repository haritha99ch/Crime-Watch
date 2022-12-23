import ReportEvidenceService from "../Services/ReportEvidenceService";
import { Request, Response, NextFunction } from "express";
import Evidence, { EvidenceDocument } from "crimewatch-shared/Models/Evidence";
import ModeratorEvidenceService from "../Services/ModeratorEvidenceService";
import IRepository from "../Services/IRepository";
import Repository from "../Services/Repository";
import EvidenceModel from "../Models/EvidenceModel";

class EvidenceController {
    private readonly reportEvidenceService: ReportEvidenceService;
    private readonly moderatorEvidenceService: ModeratorEvidenceService;
    private readonly _evidenceRepository: IRepository<EvidenceDocument>;
    constructor() {
        this.reportEvidenceService = new ReportEvidenceService();
        this.moderatorEvidenceService = new ModeratorEvidenceService();
        this._evidenceRepository = new Repository<EvidenceDocument>(
            EvidenceModel
        );
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
    public async GetEvidenceById(
        request: Request<{ evidenceId: string }>,
        response: Response<EvidenceDocument>,
        next: NextFunction
    ) {
        console.log("pass");

        const evidence = await this._evidenceRepository.GetById(
            request.params.evidenceId
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
        response: Response<boolean>,
        next: NextFunction
    ) {
        const evidenceDeleted = await this.reportEvidenceService.RemoveEvidence(
            request.params.reportId,
            request.params.evidenceId
        );
        return response.send(evidenceDeleted);
    }
    //Moderator options
    public async BeModeratorById(
        request: Request<{ moderatorId: string; evidenceId: string }>,
        response: Response<EvidenceDocument>,
        next: NextFunction
    ) {
        const evidence = await this.moderatorEvidenceService.BeModerator(
            request.params.moderatorId,
            request.params.evidenceId
        );
        return response.send(evidence);
    }
    public async ApproveById(
        request: Request<{ evidenceId: string }>,
        response: Response<boolean>,
        next: NextFunction
    ) {
        const evidenceApproved = await this.moderatorEvidenceService.Approve(
            request.params.evidenceId
        );
        return response.send(evidenceApproved);
    }
    public async DeclineById(
        request: Request<{ evidenceId: string }>,
        response: Response<boolean>,
        next: NextFunction
    ) {
        const evidenceDeclined = await this.moderatorEvidenceService.Decline(
            request.params.evidenceId
        );
        return response.send(evidenceDeclined);
    }
    public async RereviewById(
        request: Request<{ evidenceId: string }>,
        response: Response<boolean>,
        next: NextFunction
    ) {
        const evidenceRereviewing =
            await this.moderatorEvidenceService.Rereview(
                request.params.evidenceId
            );
        return response.send(evidenceRereviewing);
    }
}
export default EvidenceController;
