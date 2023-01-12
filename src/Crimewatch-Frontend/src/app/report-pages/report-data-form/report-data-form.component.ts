import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import Province from "crimewatch-shared/Enums/Province";
import Status from "crimewatch-shared/Enums/Status";
import ReportViewModel from "crimewatch-shared/ViewModels/ReportViewModel";

@Component({
    selector: "app-report-data-form",
    templateUrl: "./report-data-form.component.html",
    styleUrls: ["./report-data-form.component.css"],
})
export class ReportDataFormComponent implements OnInit {
    @Input()
    public reportDetails: ReportViewModel;
    @Output()
    public onSubmit = new EventEmitter<ReportViewModel>();
    public provinces: string[] = [];
    constructor() {
        this.reportDetails = {
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
            Date: new Date(),
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
                File: "../../../assets/imgPlaceholder.png",
            },
            Status: Status.Pending,
            ModeratorNote: "",
        };
        this.provinces.push("Central");
        this.provinces.push("East");
        this.provinces.push("North");
        this.provinces.push("Northcentral");
        this.provinces.push("Northwest");
        this.provinces.push("Sabaragamuwa");
        this.provinces.push("South");
        this.provinces.push("Uva");
        this.provinces.push("West");
    }
    ngOnInit(): void {}

    public onButtonClicked(): void {
        this.onSubmit.emit(this.reportDetails);
    }
    public SetImage(event: any): void {
        if (!event.target.files) return;
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            this.reportDetails.File.File = reader.result?.toString()!;
        };
        reader.readAsDataURL(file);
    }
}
