import { Component, Input, OnInit } from "@angular/core";
import Moderator from "crimewatch-shared/Models/Moderator";
import Witness from "crimewatch-shared/Models/Witness";
import { ModeratorService } from "src/services/moderator.service";
import { WitnessService } from "src/services/witness.service";

@Component({
    selector: "app-notification-item",
    templateUrl: "./notification-item.component.html",
    styleUrls: ["./notification-item.component.css"],
})
export class NotificationItemComponent implements OnInit {
    @Input()
    public notification?: {
        ReportId: string;
        Message: string;
        Seen: boolean;
    };
    public by?: Witness | Moderator;
    constructor() {}
    ngOnInit(): void {}
}
