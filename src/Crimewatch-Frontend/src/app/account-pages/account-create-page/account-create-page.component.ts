import { Component } from "@angular/core";
import { Router } from "@angular/router";
import Moderator from "../../../../../Crimewatch-Shared/Models/Moderator";
import User from "../../../../../Crimewatch-Shared/Models/User";
import Witness from "../../../../../Crimewatch-Shared/Models/Witness";
import { ModeratorService } from "src/services/moderator.service";
import { WitnessService } from "src/services/witness.service";

@Component({
    selector: "app-account-create-page",
    templateUrl: "./account-create-page.component.html",
    styleUrls: ["./account-create-page.component.css"],
})
export class AccountCreatePageComponent {
    hide = true;
    rhide = true;
    reEnterPassword: string = "";

    public newUser: User;
    public moderator: Moderator;
    public witness: Witness;
    public provinces: string[] = [];

    constructor(
        private readonly moderatorService: ModeratorService,
        private readonly witnessService: WitnessService,
        private readonly router: Router
    ) {
        this.newUser = {
            FirstName: "",
            LastName: "",
            DOB: null!,
            Gender: null!,
            Age: null!,
            PhoneNumber: null!,
            Account: {
                Email: "",
                Password: "",
                IsModerator: false,
            },
        };
        this.moderator = {
            User: this.newUser,
            PoliceId: null!,
            Province: null!,
        };
        this.witness = {
            User: this.newUser,
        };
        this.provinces.push("Central");
        this.provinces.push("East");
        this.provinces.push("North");
        this.provinces.push("Northcentral");
        this.provinces.push("Northwest");
        this.provinces.push("Sabaragamuwa");
        this.provinces.push("South");
        this.provinces.push("Uva");
        this.provinces.push("West");
    }

    public onSubmit() {
        this.newUser.Age = this._calculateAge(this.newUser.DOB);
        if (this.newUser.Account.IsModerator) {
            this.moderator.User = this.newUser;
            this.moderatorService
                .Create(this.moderator)
                .subscribe((moderator) => {
                    this.router.navigateByUrl("Account/Signin");
                });
        } else {
            this.witness.User = this.newUser;
            this.witnessService.Create(this.witness).subscribe((witness) => {
                this.router.navigateByUrl("Account/Signin");
            });
        }
    }
    _calculateAge(birthday: Date) {
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}
