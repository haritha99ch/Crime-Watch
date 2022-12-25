import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Moderator from "crimewatch-shared/Models/Moderator";
import Witness from "crimewatch-shared/Models/Witness";
import ReportViewModel from "crimewatch-shared/ViewModels/ReportViewModel";
import { AuthenticationService } from "src/services/authentication.service";
import { ModeratorService } from "src/services/moderator.service";
import { WitnessService } from "src/services/witness.service";

@Component({
    selector: "app-account-index-page",
    templateUrl: "./account-index-page.component.html",
    styleUrls: ["./account-index-page.component.css"],
})
export class AccountIndexPageComponent implements OnInit {
    public currentUser?: Witness | Moderator;
    public moderator?: Moderator;
    public witness?: Witness;
    public userReports: ReportViewModel[];
    constructor(
        private readonly witnessService: WitnessService,
        private readonly moderatorService: ModeratorService,
        private readonly authenticationService: AuthenticationService,
        private readonly router: Router
    ) {
        this.currentUser;
        this.userReports = [];
    }
    ngOnInit(): void {
        this.GetCurrentUser();
        console.log(this.moderator);
        console.log(this.witness);
    }

    public GetCurrentUser() {
        this.currentUser = this.authenticationService.GetCurrentUser();
        if (!this.currentUser)
            return this.router.navigateByUrl("/Account/Signin");
        if (!this.currentUser.User.Account.IsModerator)
            return (this.witness = this.currentUser);
        return (this.moderator = this.currentUser as Moderator);
    }
}
