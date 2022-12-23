import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import Status from "crimewatch-shared/Enums/Status";
import User from "crimewatch-shared/Models/User";
import { ReportDetailsViewModel } from "crimewatch-shared/ViewModels/ReportDetailsViewModel";
import { EvidenceService } from "src/services/evidence.service";
import { ReportService } from "src/services/report.service";

@Component({
    selector: "app-report-details-page",
    templateUrl: "./report-details-page.component.html",
    styleUrls: ["./report-details-page.component.css"],
})
export class ReportDetailsPageComponent implements OnInit {
    reportDetails: ReportDetailsViewModel = {
        Author: {
            User: {
                FirstName: "",
                LastName: "",
                DOB: null!,
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
        Status: Status.Pending,
    };
    constructor(
        private readonly route: ActivatedRoute,
        private readonly reportService: ReportService,
        private readonly evidenceService: EvidenceService
    ) {}
    ngOnInit(): void {
        // this.reportDetails = new ReportDetailsViewModel();
        const id = this.route.snapshot.paramMap.get("id");
        this.reportService.Details(id!).subscribe((report) => {
            this.reportDetails = report;
        });
        this.evidenceService.GetAllForReport(id!).subscribe((evidences) => {
            this.reportDetails.Evidences = evidences;
        });
    }
}
