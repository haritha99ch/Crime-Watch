import { expect } from "chai";
import { ReportDocument } from "crimewatch-shared/Models/Report";
import { WitnessDocument } from "crimewatch-shared/Models/Witness";
import ReportModel from "../../src/Models/ReportModel";
import WitnessModel from "../../src/Models/WitnessModel";
import Repository from "../../src/Services/Repository";
import { reportPayload } from "../Data/reportPayload";
import ReportViewModel from "crimewatch-shared/ViewModels/ReportViewModel";

describe("Report services test", () => {
    it("Should get a witness id and create a new report", async () => {
        const _witnessRepository = new Repository<WitnessDocument>(
            WitnessModel
        );
        const _reportRepository = new Repository<ReportDocument>(ReportModel);

        const witnessId = await (await _witnessRepository.GetAll()).pop()?._id;
        const newReport = reportPayload;
        newReport.Author = witnessId;

        const insertReport = await _reportRepository.Create(newReport);
        expect(newReport.Body).to.equals(insertReport.Body);
    });
});
