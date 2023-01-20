import { Component, Input, OnInit } from "@angular/core";
import Moderator from "crimewatch-shared/Models/Moderator";
import Notification from "crimewatch-shared/Models/Notification";
import Witness from "crimewatch-shared/Models/Witness";
import { ModeratorService } from "src/services/moderator.service";
import { NotificationService } from "src/services/notification.service";
import { WitnessService } from "src/services/witness.service";

@Component({
    selector: "app-notification-item",
    templateUrl: "./notification-item.component.html",
    styleUrls: ["./notification-item.component.css"],
})
export class NotificationItemComponent implements OnInit {
    @Input()
    public notification?: Notification;
    public by?: Witness | Moderator;
    seen: boolean = false;
    constructor(private readonly notificationService: NotificationService) {}
    ngOnInit(): void {
        this.seen = this.notification?.Seen!;
    }
    onClick(): void {
        return;
        this.notificationService
            .Seen((this.notification as any)._id)
            .subscribe((e) => {
                this.seen = true;
            });
    }
}
