import Status from "crimewatch-shared/Enums/Status";
import { EvidenceDocument } from "crimewatch-shared/Models/Evidence";
import { UpdateQuery } from "mongoose";
import EvidenceModel from "../Models/EvidenceModel";
import IRepository from "./IRepository";
import Repository from "./Repository";

class ModeratorReportService {
    private readonly _evidenceRepository: IRepository<EvidenceDocument>;
    constructor() {
        this._evidenceRepository = new Repository<EvidenceDocument>(
            EvidenceModel
        );
    }

    public async BeModerator(
        moderatorId: string,
        evidenceId: string
    ): Promise<EvidenceDocument> {
        const update: UpdateQuery<EvidenceDocument> = {
            $set: { Moderator: moderatorId, Status: Status.UnderReview },
        };
        const evidence = await this._evidenceRepository.UpdateById(
            evidenceId,
            update
        );
        return evidence;
    }
    public async Approve(evidenceId: string): Promise<boolean> {
        const update: UpdateQuery<EvidenceDocument> = {
            $set: { Status: Status.Approved },
        };
        const evidenceApproved = await this._evidenceRepository
            .UpdateById(evidenceId, update)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
        return evidenceApproved;
    }
    public async Decline(evidenceId: string): Promise<boolean> {
        const update: UpdateQuery<EvidenceDocument> = {
            $set: { Status: Status.Declined },
        };
        const evidenceDeclined = await this._evidenceRepository
            .UpdateById(evidenceId, update)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
        return evidenceDeclined;
    }
    public async Rereview(evidenceId: string): Promise<boolean> {
        const update: UpdateQuery<EvidenceDocument> = {
            $set: { Status: Status.UnderReview },
        };
        const evidenceRereviewing = await this._evidenceRepository
            .UpdateById(evidenceId, update)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
        return evidenceRereviewing;
    }
    public async ModeratorNote(
        evidenceId: string,
        note: string
    ): Promise<boolean> {
        const update: UpdateQuery<EvidenceDocument> = {
            $set: { ModeratorNote: note },
        };
        const evidenceNoted = await this._evidenceRepository
            .UpdateById(evidenceId, update)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
        return evidenceNoted;
    }
}
export default ModeratorReportService;
