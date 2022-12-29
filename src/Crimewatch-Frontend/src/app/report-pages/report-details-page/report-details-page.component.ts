import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import Status from "crimewatch-shared/Enums/Status";
import Evidence from "crimewatch-shared/Models/Evidence";
import Moderator from "crimewatch-shared/Models/Moderator";
import User from "crimewatch-shared/Models/User";
import Witness from "crimewatch-shared/Models/Witness";
import EvidenceViewModel from "crimewatch-shared/ViewModels/EvidenceViewModel";
import { ReportDetailsViewModel } from "crimewatch-shared/ViewModels/ReportDetailsViewModel";
import { AuthenticationService } from "src/services/authentication.service";
import { EvidenceService } from "src/services/evidence.service";
import { NotificationService } from "src/services/notification.service";
import { ReportService } from "src/services/report.service";

@Component({
    selector: "app-report-details-page",
    templateUrl: "./report-details-page.component.html",
    styleUrls: ["./report-details-page.component.css"],
})
export class ReportDetailsPageComponent implements OnInit {
    infoLoading: boolean = true;
    public currentUser?:
        | (Witness & { _id?: string })
        | (Moderator & { _id?: string });
    reportDetails?: ReportDetailsViewModel;
    panelOpenState = false;
    constructor(
        private readonly route: ActivatedRoute,
        private readonly reportService: ReportService,
        private readonly evidenceService: EvidenceService,
        private readonly authenticationService: AuthenticationService,
        private readonly notificationService: NotificationService
    ) {}
    ngOnInit(): void {
        // this.reportDetails = new ReportDetailsViewModel();
        this.GetUser();
        const id = this.route.snapshot.paramMap.get("id");
        this.reportService.Details(id!).subscribe((report) => {
            this.reportDetails = report;
        });
        this.evidenceService.GetAllForReport(id!).subscribe((evidences) => {
            if (this.currentUser?.User.Account.IsModerator) {
                this.reportDetails!.Evidences = evidences;
            } else {
                this.reportDetails!.Evidences = evidences.filter((r) => {
                    return r.Status !== "Pending";
                })!;
            }
            this.infoLoading = false;
        });
        console.log(this.currentUser?._id);
        this.notificationService.messages.subscribe(
            (message: { to: string; reportId: string; message: string }) => {
                console.log(message);
            }
        );
    }

    private GetUser() {
        this.currentUser = this.authenticationService.GetCurrentUser();
    }
    onSubmit(newEvidence: any) {
        newEvidence.Author = "63a46f8ceb230701cc95d719";
        this.evidenceService
            .CreateForReport(this.reportDetails!._id!, newEvidence)
            .subscribe((evidence) => {
                this.reportDetails!.Evidences?.push(evidence);
                this.notificationService.Create(
                    this.reportDetails!.Moderator?._id.toString()!,
                    {
                        ReportId: this.reportDetails!._id?.toString()!,
                        Message: "New Evidence Added",
                        Seen: false,
                    }
                );
                this.notificationService.SendMessage({
                    to: this.reportDetails!.Moderator?._id,
                    reportId: this.reportDetails!._id,
                    message: "New Evidence Added",
                });
            });
    }
    private GetModeratorOptions() {
        this.reportService
            .BeModerator(this.currentUser!._id!, this.reportDetails!._id!)
            .subscribe((report) => {
                this.reportDetails!.Moderator = report.Moderator;
            });
    }
    public Approve() {
        this.GetModeratorOptions();
        this.reportService.Approve(this.reportDetails!._id!).subscribe(() => {
            this.reportDetails!.Status = Status.Approved;
        });
    }
    public Review() {
        this.GetModeratorOptions();
        this.reportService.Rereview(this.reportDetails!._id!).subscribe(() => {
            this.reportDetails!.Status = Status.UnderReview;
        });
    }
    public Declined() {
        this.GetModeratorOptions();
        this.reportService.Decline(this.reportDetails!._id!).subscribe(() => {
            this.reportDetails!.Status = Status.Declined;
        });
    }
}
