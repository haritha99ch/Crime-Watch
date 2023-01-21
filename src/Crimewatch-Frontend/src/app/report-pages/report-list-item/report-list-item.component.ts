import { Component, Input, OnInit } from "@angular/core";
import ReportViewModel from "../../../../../Crimewatch-Shared/ViewModels/ReportViewModel";

@Component({
    selector: "app-report-list-item",
    templateUrl: "./report-list-item.component.html",
    styleUrls: ["./report-list-item.component.css"],
})
export class ReportListItemComponent implements OnInit {
    @Input()
    public reportItem?: ReportViewModel;
    constructor() {}
    ngOnInit(): void {}
}
