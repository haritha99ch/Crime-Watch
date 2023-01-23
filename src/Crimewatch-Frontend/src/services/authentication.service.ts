import { Injectable } from "@angular/core";

import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import Moderator from "../../../Crimewatch-Shared/Models/Moderator";
import Witness from "../../../Crimewatch-Shared/Models/Witness";

@Injectable({
    providedIn: "root",
})
export class AuthenticationService {
    private isSignedIn = new BehaviorSubject<boolean>(false);
    public currentUser?:
        | (Witness & { _id: string })
        | (Moderator & { _id: string });
    constructor(private readonly jwtHelper: JwtHelperService) {}

    public SetToken(token: string) {
        if (!token) return;
        localStorage.setItem("token", token);
        this.isSignedIn.next(true);
        this.GetCurrentUser();
    }
    public RemoveToken(): boolean {
        localStorage.removeItem("token");
        this.isSignedIn.next(false);
        this.GetCurrentUser();
        return true;
    }
    public IsAuthenticated(): boolean {
        const token = localStorage.getItem("token");
        return !this.jwtHelper.isTokenExpired(token);
    }
    public IsModerator() {
        const token = localStorage.getItem("token");
        if (!token) return null!;
        const decodedToken: any = this.jwtHelper.decodeToken(token);
        const isModerator: boolean = decodedToken.user.User.Account.IsModerator;
        if (isModerator) return true;
        return false;
    }
    public GetCurrentUser():
        | (Witness & { _id: string })
        | (Moderator & { _id: string }) {
        const token = localStorage.getItem("token");
        if (!token) return null!;
        const decodedToken: any = this.jwtHelper.decodeToken(token);
        const user:
            | (Witness & { _id: string })
            | (Moderator & { _id: string }) = decodedToken.user;
        this.isSignedIn.next(true);
        this.currentUser = user;
        return this.currentUser;
    }
    public isUserSignedIn() {
        return this.isSignedIn.asObservable();
    }
}
