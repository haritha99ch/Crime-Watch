import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import Evidence, { EvidenceDocument } from "crimewatch-shared/Models/Evidence";
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
    ): Observable<EvidenceDocument> {
        return this.http.post<EvidenceDocument>(
            `/API/Evidence/Create/${reportId}`,
            evidence,
            httpOptions
        );
    }
    public GetAllForReport(reportId: string): Observable<EvidenceDocument[]> {
        return this.http.get<EvidenceDocument[]>(
            `/API/Evidence/GetAll/${reportId}`,
            httpOptions
        );
    }
    public Update(
        evidenceId: string,
        update: Evidence
    ): Observable<EvidenceDocument> {
        return this.http.patch<EvidenceDocument>(
            `/API/Evidence/Update/${evidenceId}`,
            update,
            httpOptions
        );
    }
    public BeModerator(
        moderatorId: string,
        evidenceId: string
    ): Observable<EvidenceDocument> {
        return this.http.patch<EvidenceDocument>(
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
