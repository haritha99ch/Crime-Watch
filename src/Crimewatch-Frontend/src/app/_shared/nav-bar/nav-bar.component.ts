import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Moderator from "crimewatch-shared/Models/Moderator";
import Witness from "crimewatch-shared/Models/Witness";
import { AuthenticationService } from "src/services/authentication.service";
import { NotificationService } from "src/services/notification.service";

@Component({
    selector: "app-nav-bar",
    templateUrl: "./nav-bar.component.html",
    styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
    showFiller = false;
    isLoggedin: any;
    public currentUser!:
        | (Witness & { _id: string })
        | (Moderator & { _id: string });
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly notificationService: NotificationService,
        private readonly router: Router
    ) {}
    ngOnInit(): void {
        this.GetUser();
        this.router.events.subscribe((event) => {
            if (event.constructor.name === "NavigationEnd") {
                this.GetUser();
            }
        });
        this.notificationService.messages.subscribe((message) => {
            console.log(message);
        });
        this.SendMessage();
    }

    SendMessage() {
        const newMessage: { to: string; notification: string } = {
            to: this.currentUser?._id,
            notification: "User conected",
        };
        this.notificationService.SendMessage(newMessage);
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
