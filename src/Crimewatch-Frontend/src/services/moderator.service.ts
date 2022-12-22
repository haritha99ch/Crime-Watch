import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import Moderator, { ModeratorDocument } from "crimewatch-shared/Models/Moderator";
import SigninViewModel from "crimewatch-shared/ViewModels/SigninViewModel";
import { Observable } from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
    }),
};

@Injectable({
    providedIn: "root",
})
export class ModeratorService {
    constructor(private readonly http: HttpClient) {}

    public Create(moderator: Moderator): Observable<ModeratorDocument> {
        return this.http.post<ModeratorDocument>(
            `/API/Witness/Create`,
            moderator,
            httpOptions
        );
    }
    public Details(id: string): Observable<ModeratorDocument> {
        return this.http.get<ModeratorDocument>(
            `/API/Details/${id}`,
            httpOptions
        );
    }
    public Delete(id: string): Observable<boolean> {
        return this.http.delete<boolean>(
            `/API/Witness/Delete/${id}`,
            httpOptions
        );
    }
    public Signin(login: SigninViewModel): Observable<{ token: string }> {
        return this.http.get<{ token: string }>(
            `/API/Witness/Signin`,
            httpOptions
        );
    }
}
