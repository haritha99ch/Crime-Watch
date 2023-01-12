import { Component, OnInit } from "@angular/core";
import Moderator from "crimewatch-shared/Models/Moderator";
import Witness from "crimewatch-shared/Models/Witness";
import ReportViewModel from "crimewatch-shared/ViewModels/ReportViewModel";
import { AuthenticationService } from "src/services/authentication.service";
import { ReportService } from "src/services/report.service";

@Component({
    selector: "app-report-index-page",
    templateUrl: "./report-index-page.component.html",
    styleUrls: ["./report-index-page.component.css"],
})
export class ReportIndexPageComponent implements OnInit {
    isLoading: boolean = true;
    public currentUser?:
        | (Witness & { _id?: string })
        | (Moderator & { _id?: string });
    public reportList?: ReportViewModel[];
    constructor(
        private readonly reportService: ReportService,
        private readonly authenticationService: AuthenticationService
    ) {}
    ngOnInit(): void {
        this.GetUser();
        this.reportService.GetAll().subscribe((reports) => {
            if (this.currentUser?.User.Account.IsModerator) {
                this.reportList = reports;
            } else {
                this.reportList = reports.filter((r) => {
                    return r.Status !== "Pending";
                })!;
            }
            this.reportList = reports;
            this.isLoading = false;
        });
    }
    private GetUser() {
        this.currentUser = this.authenticationService.GetCurrentUser();
    }
}
