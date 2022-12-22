import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import Report, { ReportDocument } from "crimewatch-shared/Models/Report";
import { Observable } from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
    }),
};

@Injectable({
    providedIn: "root",
})
export class ReportService {
    constructor(private readonly http: HttpClient) {}

    public Create(report: Report): Observable<ReportDocument> {
        return this.http.post<ReportDocument>(
            `/API/Report/Create`,
            report,
            httpOptions
        );
    }
    public GetAll(): Observable<ReportDocument[]> {
        return this.http.get<ReportDocument[]>(
            `/API/Report/GetAll`,
            httpOptions
        );
    }
    public Details(reportId: string): Observable<ReportDocument> {
        return this.http.get<ReportDocument>(
            `/API/Report/Details/${reportId}`,
            httpOptions
        );
    }
    public Update(
        reportId: string,
        update: Report
    ): Observable<ReportDocument> {
        return this.http.patch<ReportDocument>(
            `/API/Report/Update/${reportId}`,
            update,
            httpOptions
        );
    }
    public BeModerator(
        moderatorId: string,
        reportId: string
    ): Observable<ReportDocument> {
        return this.http.patch<ReportDocument>(
            `/API/Report/Moderator/${moderatorId}/${reportId}`,
            {},
            httpOptions
        );
    }
    public Approve(reportId: string): Observable<boolean> {
        return this.http.patch<boolean>(
            `/API/Report/Approve/${reportId}`,
            {},
            httpOptions
        );
    }
    public Decline(reportId: string): Observable<boolean> {
        return this.http.patch<boolean>(
            `/API/Report/Decline/${reportId}`,
            {},
            httpOptions
        );
    }
    public Rereview(reportId: string): Observable<boolean> {
        return this.http.patch<boolean>(
            `/API/Report/Review/${reportId}`,
            {},
            httpOptions
        );
    }
}
