import { Component } from "@angular/core";
import { Router } from "@angular/router";
import SigninViewModel from "crimewatch-shared/ViewModels/SigninViewModel";
import { ModeratorService } from "src/services/moderator.service";
import { WitnessService } from "src/services/witness.service";

@Component({
    selector: "app-account-signin-page",
    templateUrl: "./account-signin-page.component.html",
    styleUrls: ["./account-signin-page.component.css"],
})
export class AccountSigninPageComponent {
    hide: boolean = true;
    inValideLogin: boolean = false;
    public signinInfo: SigninViewModel;
    constructor(
        private readonly witnessService: WitnessService,
        private readonly moderatorService: ModeratorService,
        private readonly router: Router
    ) {
        this.signinInfo = {
            Email: "",
            Password: "",
        };
    }

    public onSubmit(): void {
        this.moderatorService.Signin(this.signinInfo).subscribe((token) => {
            if (token) this.router.navigateByUrl("Report/Index");
        });
        this.witnessService.Signin(this.signinInfo).subscribe((token) => {
            if (token) this.router.navigateByUrl("Report/Index");
        });

        this.inValideLogin = true;
    }
}
