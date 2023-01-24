import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Moderator from "../../../../../Crimewatch-Shared/Models/Moderator";
import Witness from "../../../../../Crimewatch-Shared/Models/Witness";
import ReportViewModel from "../../../../../Crimewatch-Shared/ViewModels/ReportViewModel";
import { AuthenticationService } from "src/services/authentication.service";
import { ReportService } from "src/services/report.service";

@Component({
    selector: "app-account-index-page",
    templateUrl: "./account-index-page.component.html",
    styleUrls: ["./account-index-page.component.css"],
})
export class AccountIndexPageComponent implements OnInit {
    public currentUser?:
        | (Witness & { _id: string })
        | (Moderator & { _id: string });
    public moderator?: Moderator;
    public witness?: Witness;
    public userReports: ReportViewModel[];
    constructor(
        private readonly reportService: ReportService,
        private readonly authenticationService: AuthenticationService,
        private readonly router: Router
    ) {
        this.currentUser;
        this.userReports = [];
    }
    ngOnInit(): void {
        this.GetCurrentUser();
        this.GetUserReports();
    }

    private GetCurrentUser() {
        this.currentUser = this.authenticationService.GetCurrentUser();
        if (!this.currentUser)
            return this.router.navigateByUrl("/Account/Signin");
        if (!this.currentUser.User.Account.IsModerator)
            return (this.witness = this.currentUser);
        return (this.moderator = this.currentUser as Moderator);
    }

    private GetUserReports() {
        this.reportService.GetAll().subscribe((report) => {
            this.userReports = report.filter(
                (r) => r.Author._id === this.currentUser?._id
            );
        });
    }
}
