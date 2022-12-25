import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import Witness, { WitnessDocument } from "crimewatch-shared/Models/Witness";
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
export class WitnessService {
    constructor(private readonly http: HttpClient) {}

    public Create(witness: Witness): Observable<WitnessDocument> {
        return this.http.post<WitnessDocument>(
            `/API/Witness/Create`,
            witness,
            httpOptions
        );
    }
    public Details(id: string): Observable<WitnessDocument> {
        return this.http.get<WitnessDocument>(
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
        return this.http.post<{ token: string }>(
            `/API/Witness/Signin`,
            login,
            httpOptions
        );
    }
}
