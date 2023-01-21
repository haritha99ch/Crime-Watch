import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import Report from "../../../Crimewatch-Shared/Models/Report";
import ReportViewModel from "../../../Crimewatch-Shared/ViewModels/ReportViewModel";
import ReportDetailsViewModel from "../../../Crimewatch-Shared/ViewModels/ReportDetailsViewModel";
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

    public Create(report: Report): Observable<ReportDetailsViewModel> {
        return this.http.post<ReportDetailsViewModel>(
            `/API/Report/Create`,
            report,
            httpOptions
        );
    }
    public GetAll(): Observable<ReportViewModel[]> {
        return this.http.get<ReportViewModel[]>(
            `/API/Report/GetAll`,
            httpOptions
        );
    }
    public Details(reportId: string): Observable<ReportDetailsViewModel> {
        return this.http.get<ReportDetailsViewModel>(
            `/API/Report/Details/${reportId}`,
            httpOptions
        );
    }
    public Update(
        reportId: string,
        update: Report
    ): Observable<ReportDetailsViewModel> {
        return this.http.patch<ReportDetailsViewModel>(
            `/API/Report/Update/${reportId}`,
            update,
            httpOptions
        );
    }
    public Delete(reportId: string): Observable<boolean> {
        return this.http.delete<boolean>(
            `/API/Report/Delete/${reportId}`,
            httpOptions
        );
    }
    public BeModerator(
        moderatorId: string,
        reportId: string
    ): Observable<ReportDetailsViewModel> {
        return this.http.patch<ReportDetailsViewModel>(
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
    public Star(reportId: string, witnessId: string): Observable<boolean> {
        return this.http.patch<boolean>(
            `/API/Report/Star/${reportId}/${witnessId}`,
            {},
            httpOptions
        );
    }
}
