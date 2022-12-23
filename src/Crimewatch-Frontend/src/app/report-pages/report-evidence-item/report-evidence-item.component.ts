import { Component, Input, OnInit } from "@angular/core";
import Province from "crimewatch-shared/Enums/Province";
import Status from "crimewatch-shared/Enums/Status";
import EvidenceViewModel from "crimewatch-shared/ViewModels/EvidenceViewModel";
import { EvidenceService } from "src/services/evidence.service";

@Component({
    selector: "app-report-evidence-item",
    templateUrl: "./report-evidence-item.component.html",
    styleUrls: ["./report-evidence-item.component.css"],
})
export class ReportEvidenceItemComponent implements OnInit {
    panelOpenState = false;
    @Input()
    public evidenceItem!: EvidenceViewModel;
    constructor(private readonly evidenceService: EvidenceService) {}
    ngOnInit(): void {}
}
