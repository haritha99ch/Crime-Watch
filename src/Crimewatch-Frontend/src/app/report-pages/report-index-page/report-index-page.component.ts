import { Component, OnInit } from "@angular/core";
import ReportViewModel from "crimewatch-shared/ViewModels/ReportViewModel";
import { ReportService } from "src/services/report.service";

@Component({
    selector: "app-report-index-page",
    templateUrl: "./report-index-page.component.html",
    styleUrls: ["./report-index-page.component.css"],
})
export class ReportIndexPageComponent implements OnInit {
    public reportList?: ReportViewModel[];
    constructor(private readonly reportService: ReportService) {}
    ngOnInit(): void {
        this.reportService.GetAll().subscribe((reports) => {
            this.reportList = reports;
            console.log(reports);
        });
    }
}
