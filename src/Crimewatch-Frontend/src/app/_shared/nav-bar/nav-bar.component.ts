import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Moderator from "crimewatch-shared/Models/Moderator";
import Witness from "crimewatch-shared/Models/Witness";
import { AuthenticationService } from "src/services/authentication.service";

@Component({
    selector: "app-nav-bar",
    templateUrl: "./nav-bar.component.html",
    styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
    showFiller = false;
    isLoggedin: any;
    public currentUser!: Witness | Moderator;
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly router: Router
    ) {}
    ngOnInit(): void {
        this.GetUser();
        this.router.events.subscribe((event) => {
            if (event.constructor.name === "NavigationEnd") {
                this.GetUser();
            }
        });
    }

    private GetUser() {
        this.currentUser = this.authenticationService.GetCurrentUser();
    }
    public Signout() {
        if (!this.currentUser) return;
        console.log("pass");
        this.authenticationService.RemoveToken();
        this.router.navigateByUrl("");
    }
}
