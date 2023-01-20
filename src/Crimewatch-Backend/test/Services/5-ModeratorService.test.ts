import Repository from "../../src/Services/Repository";
import { ModeratorDocument } from "crimewatch-shared/Models/Moderator";
import ModeratorModel from "../../src/Models/ModeratorModel";
import ModeratorReportService from "../../src/Services/ModeratorReportService";
import { ReportDocument } from "crimewatch-shared/Models/Report";
import ReportModel from "../../src/Models/ReportModel";
import { expect } from "chai";

describe("Test moderator services", () => {
    it("Should approve the report", async () => {
        const _moderatorRepository = new Repository<ModeratorDocument>(
            ModeratorModel
        );
        const moderatorReportService = new ModeratorReportService();
        const _reportRepository = new Repository<ReportDocument>(ReportModel);
        const reportId = await (await _reportRepository.GetAll()).pop()?._id;

        const moderatorId = await (await _moderatorRepository.GetAll()).pop()!
            ._id;
        const ismode = await moderatorReportService.BeModerator(
            moderatorId,
            reportId
        );
        expect(ismode.Moderator).null;
        const reportDeclined = await moderatorReportService.Decline(reportId);
        expect(reportDeclined).is.true;
        const reportApprvoe = await moderatorReportService.Approve(reportId);
        expect(reportApprvoe).is.true;
    });
});
