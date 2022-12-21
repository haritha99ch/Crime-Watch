import { expect } from "chai";
import { ReportDocument } from "crimewatch-shared/Models/Report";
import { WitnessDocument } from "crimewatch-shared/Models/Witness";
import ReportModel from "../../src/Models/ReportModel";
import WitnessModel from "../../src/Models/WitnessModel";
import ReportEvidenceService from "../../src/Services/ReportEvidenceService";
import Repository from "../../src/Services/Repository";
import { evidencePayload } from "../Data/evidencePayload";

describe("Adding evidences to report", () => {
    it("Should add a new evidence to report", async () => {
        const reportEvidenceService = new ReportEvidenceService();
        const _witnessRepository = new Repository<WitnessDocument>(
            WitnessModel
        );
        const _reportRepository = new Repository<ReportDocument>(ReportModel);

        const witnessId = await (await _witnessRepository.GetAll()).pop()?._id;
        const reportId = await (await _reportRepository.GetAll()).pop()?._id;

        const newEvidence = evidencePayload;
        newEvidence.Author = witnessId;

        const insertEvidence =
            await reportEvidenceService.AddNewEvidenceToReport(
                reportId,
                newEvidence
            );
        expect(newEvidence.Body).to.equals(insertEvidence.Body);
    });
});
