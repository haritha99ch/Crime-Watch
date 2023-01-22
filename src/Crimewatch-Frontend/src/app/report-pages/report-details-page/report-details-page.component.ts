import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import Status from "../../../../../Crimewatch-Shared/Enums/Status";
import Moderator from "../../../../../Crimewatch-Shared/Models/Moderator";
import Notification from "../../../../../Crimewatch-Shared/Models/Notification";
import Witness from "../../../../../Crimewatch-Shared/Models/Witness";
import { ReportDetailsViewModel } from "../../../../../Crimewatch-Shared/ViewModels/ReportDetailsViewModel";
import SigninViewModel from "../../../../../Crimewatch-Shared/ViewModels/SigninViewModel";
import { AuthenticationService } from "src/services/authentication.service";
import { EvidenceService } from "src/services/evidence.service";
import { ModeratorService } from "src/services/moderator.service";
import { NotificationService } from "src/services/notification.service";
import { ReportService } from "src/services/report.service";
import { WitnessService } from "src/services/witness.service";
import { DeleteConfirmItemComponent } from "../delete-confirm-item/delete-confirm-item.component";
export interface DialogData {
    animal: string;
    name: string;
}
@Component({
    selector: "app-report-details-page",
    templateUrl: "./report-details-page.component.html",
    styleUrls: ["./report-details-page.component.css"],
})
export class ReportDetailsPageComponent implements OnInit {
    infoLoading: boolean = true;
    reportDetails?: ReportDetailsViewModel;
    panelOpenState = false;
    currentUserIsAuthor: boolean = false;
    currentUserStared: boolean = false;

    public currentUser?:
        | (Witness & { _id?: string })
        | (Moderator & { _id?: string });
    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly reportService: ReportService,
        private readonly evidenceService: EvidenceService,
        private readonly authenticationService: AuthenticationService,
        private readonly notificationService: NotificationService,
        public dialog: MatDialog
    ) {}
    ngOnInit(): void {
        // this.reportDetails = new ReportDetailsViewModel();
        this.GetUser();
        const id = this.route.snapshot.paramMap.get("id");
        this.reportService.Details(id!).subscribe((report) => {
            this.reportDetails = report;
            if (report.Author._id === this.currentUser?._id)
                this.currentUserIsAuthor = true;
            if (
                this.reportDetails.Stared?.includes(
                    this.currentUser?._id as any
                )
            )
                this.currentUserStared = true;
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
        newEvidence.Author = this.currentUser?._id;
        //Posting notification to the server
        const notification: Notification = {
            ReportId: this.reportDetails?._id?.toString()!,
            Message: "New Evidence",
            Date: new Date(),
            Seen: false,
        };
        if (this.reportDetails?.Moderator?._id) {
            this.notificationService
                .CreateForModerator(
                    this.reportDetails!.Moderator?._id.toString()!,
                    notification
                )
                .subscribe((notification) => {});
        }
        this.evidenceService
            .CreateForReport(this.reportDetails!._id!, newEvidence)
            .subscribe((evidence) => {
                this.reportDetails!.Evidences?.push(evidence);
            });
        if (!this.currentUserStared) this.onStarClicked();
        this.panelOpenState = false;
        //sending socket notification to the moderator
        if (!this.reportDetails?.Moderator?._id) return;
        this.notificationService.SendMessage({
            to: this.reportDetails.Moderator._id,
            reportId: this.reportDetails!._id,
            message: "New Evidence Added",
            Date: new Date(),
        });
        for (let i = 0; i < this.reportDetails!.Stared!.length; i++) {
            if (
                this.reportDetails!.Stared![i].toString() !==
                this.reportDetails?.Author._id
            )
                this.notificationService.SendMessage({
                    to: this.reportDetails!.Stared![i],
                    reportId: this.reportDetails!._id,
                    message: "New Evidence Added",
                    Date: new Date(),
                });
        }
    }
    onSigninClicked(): void {
        this.router.navigate(["/Account/Signin"], {
            queryParams: { redirectURL: this.route.snapshot.url },
        });
    }
    onStarClicked(): void {
        this.reportService
            .Star(this.reportDetails?._id!, this.currentUser?._id!)
            .subscribe((isStared) => {
                this.currentUserStared = isStared;
            });
    }
    onDeleteClicked(): void {
        const dialogRef = this.dialog.open(DeleteConfirmItemComponent);

        dialogRef.afterClosed().subscribe((result) => {
            if (!result) return;
            this.reportService
                .Delete(this.reportDetails?._id!)
                .subscribe((deleted) => {
                    this.router.navigate(["/Report/Index"]);
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
