import Repository from "../../src/Services/Repository";
import { ModeratorDocument } from "crimewatch-shared/Models/Moderator";
import ModeratorModel from "../../src/Models/ModeratorModel";
import ModeratorReportService from "../../src/Services/ModeratorReportService";
import { ReportDocument } from "crimewatch-shared/Models/Report";
import ReportModel from "../../src/Models/ReportModel";
import { expect } from "chai";

describe("Test moderator services", () => {
    it("Should approve and place a note in the report", async () => {
        const _moderatorRepository = new Repository<ModeratorDocument>(
            ModeratorModel
        );
        const moderatorReportService = new ModeratorReportService();
        const _reportRepository = new Repository<ReportDocument>(ReportModel);
        const reportId = await (await _reportRepository.GetAll()).pop()?._id;

        const moderatorId = await (await _moderatorRepository.GetAll()).pop()!
            ._id;
        const note = "Not enough evidences";
        const ismode = await moderatorReportService.BeModerator(
            moderatorId,
            reportId
        );
        expect(ismode.Moderator).not.null;
        const reportDeclined = await moderatorReportService.Decline(reportId);
        expect(reportDeclined).is.false;
        const newnote = await moderatorReportService.ModeratorNote(
            reportId,
            note
        );
        expect(newnote).is.true;
        const reportApprvoe = await moderatorReportService.Decline(reportId);
        expect(reportDeclined).is.true;
    });
});
