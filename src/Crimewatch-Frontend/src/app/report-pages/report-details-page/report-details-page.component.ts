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
    reportDetails: ReportDetailsViewModel = {
        Author: {
            User: {
                FirstName: "",
                LastName: "",
                DOB: null!,
                Gender: null!,
                Age: null!,
                PhoneNumber: null!,
                Account: null!,
            },
            _id: null!,
        },
        Caption: "",
        Body: "",
        Date: null!,
        Location: {
            No: "",
            Street1: "",
            Street2: "",
            Street3: "",
            City: "",
            Province: null!,
        },
        Categories: [],
        File: {
            File: null!,
        },
        Evidences: [],
        Status: Status.Pending,
    };
    panelOpenState = false;
    constructor(
        private readonly route: ActivatedRoute,
        private readonly reportService: ReportService,
        private readonly evidenceService: EvidenceService,
        private readonly authenticationService: AuthenticationService
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
                this.reportDetails.Evidences = evidences;
            } else {
                this.reportDetails.Evidences = evidences.filter((r) => {
                    return r.Status !== "Pending";
                })!;
            }
            this.infoLoading = false;
        });
        console.log("hmm");

        console.log(this.currentUser?._id);
    }

    private GetUser() {
        this.currentUser = this.authenticationService.GetCurrentUser();
    }
    onSubmit(newEvidence: any) {
        newEvidence.Author = "63a46f8ceb230701cc95d719";
        this.evidenceService
            .CreateForReport(this.reportDetails._id!, newEvidence)
            .subscribe((evidence) => {
                this.reportDetails.Evidences?.push(evidence);
            });
    }
    private GetModeratorOptions() {
        this.reportService
            .BeModerator(this.currentUser!._id!, this.reportDetails._id!)
            .subscribe((report) => {
                this.reportDetails.Moderator = report.Moderator;
            });
    }
    public Approve() {
        this.GetModeratorOptions();
        this.reportService.Approve(this.reportDetails._id!).subscribe(() => {
            this.reportDetails.Status = Status.Approved;
        });
    }
    public Review() {
        this.GetModeratorOptions();
        this.reportService.Rereview(this.reportDetails._id!).subscribe(() => {
            this.reportDetails.Status = Status.UnderReview;
        });
    }
    public Declined() {
        this.GetModeratorOptions();
        this.reportService.Decline(this.reportDetails._id!).subscribe(() => {
            this.reportDetails.Status = Status.Declined;
        });
    }
}
