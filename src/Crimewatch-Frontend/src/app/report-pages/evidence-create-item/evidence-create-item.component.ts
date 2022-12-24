import { Component, EventEmitter, Output } from "@angular/core";
import Status from "crimewatch-shared/Enums/Status";
import EvidenceViewModel from "crimewatch-shared/ViewModels/EvidenceViewModel";

@Component({
    selector: "app-evidence-create-item",
    templateUrl: "./evidence-create-item.component.html",
    styleUrls: ["./evidence-create-item.component.css"],
})
export class EvidenceCreateItemComponent {
    public newEvidence: EvidenceViewModel;
    public provinces: string[] = [];
    @Output()
    public onSubmit = new EventEmitter<EvidenceViewModel>();
    constructor() {
        this.newEvidence = {
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
            Date: new Date(),
            Location: {
                No: "",
                Street1: "",
                Street2: "",
                Street3: "",
                City: "",
                Province: null!,
            },
            Files: [],
            Status: Status.Pending,
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

    public onButtonClicked() {
        this.onSubmit.emit(this.newEvidence);
    }
    public SetImage(event: any) {
        if (!event.target.files) return;
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const image = reader.result?.toString()!;
            this.newEvidence.Files.push({ File: image });
        };
        reader.readAsDataURL(file);
    }
}
