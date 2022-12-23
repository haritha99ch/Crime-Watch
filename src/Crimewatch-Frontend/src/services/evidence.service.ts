import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import Evidence, { EvidenceDocument } from "crimewatch-shared/Models/Evidence";
import EvidenceViewModel from "crimewatch-shared/ViewModels/EvidenceViewModel";
import { Observable } from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
    }),
};

@Injectable({
    providedIn: "root",
})
export class EvidenceService {
    constructor(private readonly http: HttpClient) {}

    public CreateForReport(
        reportId: string,
        evidence: Evidence
    ): Observable<EvidenceViewModel> {
        return this.http.post<EvidenceViewModel>(
            `/API/Evidence/Create/${reportId}`,
            evidence,
            httpOptions
        );
    }
    public GetAllForReport(reportId: string): Observable<EvidenceViewModel[]> {
        return this.http.get<EvidenceViewModel[]>(
            `/API/Evidence/GetAll/${reportId}`,
            httpOptions
        );
    }
    public Update(
        evidenceId: string,
        update: Evidence
    ): Observable<EvidenceViewModel> {
        return this.http.patch<EvidenceViewModel>(
            `/API/Evidence/Update/${evidenceId}`,
            update,
            httpOptions
        );
    }
    public BeModerator(
        moderatorId: string,
        evidenceId: string
    ): Observable<EvidenceViewModel> {
        return this.http.patch<EvidenceViewModel>(
            `/API/Evidence/Moderator/${moderatorId}/${evidenceId}`,
            {},
            httpOptions
        );
    }
    public Approve(evidenceId: string): Observable<boolean> {
        return this.http.patch<boolean>(
            `/API/Evidence/Approve/${evidenceId}`,
            {},
            httpOptions
        );
    }
    public Decline(evidenceId: string): Observable<boolean> {
        return this.http.patch<boolean>(
            `/API/Evidence/Decline/${evidenceId}`,
            {},
            httpOptions
        );
    }
    public Rereview(EvidenceId: string): Observable<boolean> {
        return this.http.patch<boolean>(
            `/API/Evidence/Review/${EvidenceId}`,
            {},
            httpOptions
        );
    }
}
