import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import ReportDetailsViewModel from "crimewatch-shared/ViewModels/ReportDetailsViewModel";
import { ReportService } from "src/services/report.service";

@Component({
    selector: "app-report-details-page",
    templateUrl: "./report-details-page.component.html",
    styleUrls: ["./report-details-page.component.css"],
})
export class ReportDetailsPageComponent implements OnInit {
    public reportDetails!: ReportDetailsViewModel;
    constructor(
        private readonly route: ActivatedRoute,
        private readonly reportService: ReportService
    ) {}
    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get("id");
        this.reportService.Details(id!).subscribe((report) => {
            this.reportDetails = report;
        });
    }
}
