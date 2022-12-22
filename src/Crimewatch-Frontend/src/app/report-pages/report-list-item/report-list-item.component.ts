import { Component, Input, OnInit } from "@angular/core";
import ReportViewModel from "crimewatch-shared/ViewModels/ReportViewModel";

@Component({
    selector: "app-report-list-item",
    templateUrl: "./report-list-item.component.html",
    styleUrls: ["./report-list-item.component.css"],
})
export class ReportListItemComponent implements OnInit {
    @Input()
    public reportItem!: ReportViewModel;
    ngOnInit(): void {}
}
