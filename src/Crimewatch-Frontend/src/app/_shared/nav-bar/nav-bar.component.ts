import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import Moderator from "../../../../../Crimewatch-Shared/Models/Moderator";
import Notification from "../../../../../Crimewatch-Shared/Models/Notification";
import Witness from "../../../../../Crimewatch-Shared/Models/Witness";
import { AuthenticationService } from "src/services/authentication.service";
import { ModeratorService } from "src/services/moderator.service";
import { WitnessService } from "src/services/witness.service";
import { WebsocketService } from "src/services/websocket.service";

@Component({
    selector: "app-nav-bar",
    templateUrl: "./nav-bar.component.html",
    styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
    showFiller = false;
    isSignedIn: boolean = false;
    public currentUser?:
        | (Witness & { _id: string })
        | (Moderator & { _id: string });
    public notificationCount: number = 0;
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly websocketService: WebsocketService,
        private readonly moderatorService: ModeratorService,
        private readonly witnessService: WitnessService,
        private readonly router: Router,
        public snackBar: MatSnackBar
    ) {}
    ngOnInit(): void {
        this.currentUser = this.authenticationService.GetCurrentUser();
        this.authenticationService.isUserSignedIn().subscribe((isSignedIn) => {
            this.isSignedIn = isSignedIn;
            this.currentUser = this.authenticationService.currentUser;
        });
        this.GetUser();
        this.router.events.subscribe((event) => {
            if (event.constructor.name === "NavigationEnd") {
                this.GetUser();
            }
        });
        // if (!this.currentUser) return;
        this.websocketService.on("notification", (notification) => {
            const newNotification: Notification = {
                ReportId: notification.reportId,
                Message: notification.message,
                Date: notification.date,
                Seen: false,
            };
            console.log(newNotification);
            this.currentUser?.Notifications?.push(newNotification);
            this.openSnackBar("New evidence add on your report", "Dismiss");
        });
    }
    private GetUser() {
        console.log("hit");
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
                    this.currentUser!.Notifications =
                        this.currentUser!.Notifications?.reverse();
                });
            return;
        }
        this.witnessService.Details(this.currentUser._id!).subscribe((user) => {
            this.currentUser = user as any;
            this.currentUser!.Notifications =
                this.currentUser!.Notifications?.reverse();
        });
    }
    public Signout() {
        this.authenticationService.RemoveToken();
        this.router.navigateByUrl("/Report/Index");
        console.log("pass");
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}
