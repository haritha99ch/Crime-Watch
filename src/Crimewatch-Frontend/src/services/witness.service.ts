import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import Witness, {
    WitnessDocument,
} from "../../../Crimewatch-Shared/Models/Witness";
import SigninViewModel from "../../../Crimewatch-Shared/ViewModels/SigninViewModel";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
    }),
};

@Injectable({
    providedIn: "root",
})
export class WitnessService {
    constructor(
        private readonly http: HttpClient,
        private readonly authenticationService: AuthenticationService
    ) {}

    public Create(witness: Witness): Observable<WitnessDocument> {
        return this.http.post<WitnessDocument>(
            `/API/Witness/Create`,
            witness,
            httpOptions
        );
    }
    public Details(id: string): Observable<WitnessDocument> {
        return this.http.get<WitnessDocument>(
            `/API/Witness/Details/${id}`,
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
        const response = this.http.post<{ token: string }>(
            `/API/Witness/Signin`,
            login,
            httpOptions
        );
        response.subscribe((result) => {
            if (!result) return;
            this.authenticationService.SetToken(result.token);
        });
        return response;
    }
    public SignOut(): boolean {
        const signOut = this.authenticationService.RemoveToken();
        return false;
    }
}
