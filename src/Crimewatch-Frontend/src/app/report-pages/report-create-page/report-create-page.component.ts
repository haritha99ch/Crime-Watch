import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Moderator from "crimewatch-shared/Models/Moderator";
import Witness from "crimewatch-shared/Models/Witness";
import ReportViewModel from "crimewatch-shared/ViewModels/ReportViewModel";
import { Schema } from "mongoose";
import { AuthenticationService } from "src/services/authentication.service";
import { ReportService } from "src/services/report.service";

@Component({
    selector: "app-report-create-page",
    templateUrl: "./report-create-page.component.html",
    styleUrls: ["./report-create-page.component.css"],
})
export class ReportCreatePageComponent implements OnInit {
    public currentUser!:
        | (Witness & { _id: string })
        | (Moderator & { _id: string });
    constructor(
        private readonly router: Router,
        private readonly reportService: ReportService,
        private readonly authenticationService: AuthenticationService
    ) {}
    ngOnInit(): void {
        this.currentUser = this.authenticationService.GetCurrentUser();
    }
    public onSubmit(reportDetails: any): void {
        reportDetails.Author = this.currentUser._id;
        this.reportService.Create(reportDetails).subscribe((report) => {
            this.router.navigateByUrl(`/Report/Details/${report._id}`);
        });
    }
}
