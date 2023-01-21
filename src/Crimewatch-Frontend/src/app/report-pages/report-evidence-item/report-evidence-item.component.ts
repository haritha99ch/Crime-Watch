import { Component, Input, OnInit } from "@angular/core";
import Province from "crimewatch-shared/Enums/Province";
import Status from "crimewatch-shared/Enums/Status";
import Moderator from "crimewatch-shared/Models/Moderator";
import User from "crimewatch-shared/Models/User";
import Witness from "crimewatch-shared/Models/Witness";
import EvidenceViewModel from "crimewatch-shared/ViewModels/EvidenceViewModel";
import { AuthenticationService } from "src/services/authentication.service";
import { EvidenceService } from "src/services/evidence.service";

@Component({
    selector: "app-report-evidence-item",
    templateUrl: "./report-evidence-item.component.html",
    styleUrls: ["./report-evidence-item.component.css"],
})
export class ReportEvidenceItemComponent implements OnInit {
    panelOpenState = false;
    public currentUser?:
        | (Witness & { _id?: string })
        | (Moderator & { _id?: string });
    @Input()
    public evidenceItem?: EvidenceViewModel;
    constructor(
        private readonly evidenceService: EvidenceService,
        private readonly authenticationService: AuthenticationService
    ) {}
    ngOnInit(): void {
        this.GetUser();
    }

    private GetUser() {
        this.currentUser = this.authenticationService.GetCurrentUser();
    }
    private GetModeratorOptions() {
        this.evidenceService
            .BeModerator(this.currentUser!._id!, this.evidenceItem!._id!)
            .subscribe((report) => {
                this.evidenceItem!.Moderator = report.Moderator;
            });
    }
    public Approve() {
        this.GetModeratorOptions();
        this.evidenceService.Approve(this.evidenceItem!._id!).subscribe(() => {
            this.evidenceItem!.Status = Status.Approved;
        });
    }
    public Review() {
        this.GetModeratorOptions();
        this.evidenceService.Rereview(this.evidenceItem!._id!).subscribe(() => {
            this.evidenceItem!.Status = Status.UnderReview;
        });
    }
    public Declined() {
        this.GetModeratorOptions();
        this.evidenceService.Decline(this.evidenceItem!._id!).subscribe(() => {
            this.evidenceItem!.Status = Status.Declined;
        });
    }
}
