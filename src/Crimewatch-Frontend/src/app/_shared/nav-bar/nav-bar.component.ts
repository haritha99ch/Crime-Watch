import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Moderator from "crimewatch-shared/Models/Moderator";
import Notification from "crimewatch-shared/Models/Notification";
import Witness from "crimewatch-shared/Models/Witness";
import { AuthenticationService } from "src/services/authentication.service";
import { ModeratorService } from "src/services/moderator.service";
import { NotificationService } from "src/services/notification.service";
import { WitnessService } from "src/services/witness.service";

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
    public notificationCount: number = 0;
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly notificationService: NotificationService,
        private readonly moderatorService: ModeratorService,
        private readonly witnessService: WitnessService,
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
            const notification: Notification = {
                ReportId: message.reportId,
                Message: message.message,
                Seen: false,
            };
            this.currentUser.Notifications?.push(notification);
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
        this.RefreshUser();
    }
    private RefreshUser(): void {
        if (!this.currentUser) return;
        if (this.currentUser.User.Account.IsModerator) {
            this.moderatorService
                .Details(this.currentUser._id!)
                .subscribe((user) => {
                    this.currentUser = user as any;
                    console.log(user);
                });
        }
        if (!this.currentUser.User.Account.IsModerator) {
            this.witnessService
                .Details(this.currentUser._id!)
                .subscribe((user) => {
                    this.currentUser = user as any;
                    console.log(user);
                });
        }
    }
    public Signout() {
        if (!this.currentUser) return;
        console.log("pass");
        this.authenticationService.RemoveToken();
        this.router.navigateByUrl("");
    }
}
