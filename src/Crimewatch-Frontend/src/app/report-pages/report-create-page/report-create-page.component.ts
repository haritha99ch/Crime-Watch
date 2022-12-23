import { Component } from "@angular/core";
import { Router } from "@angular/router";
import ReportViewModel from "crimewatch-shared/ViewModels/ReportViewModel";
import { Schema } from "mongoose";
import { ReportService } from "src/services/report.service";

@Component({
    selector: "app-report-create-page",
    templateUrl: "./report-create-page.component.html",
    styleUrls: ["./report-create-page.component.css"],
})
export class ReportCreatePageComponent {
    constructor(
        private readonly router: Router,
        private readonly reportService: ReportService
    ) {}
    public onSubmit(reportDetails: any): void {
        reportDetails.Author = "63a46f8ceb230701cc95d719";
        this.reportService.Create(reportDetails).subscribe((report) => {
            this.router.navigateByUrl(`/Report/Details/${report._id}`);
        });
    }
}
