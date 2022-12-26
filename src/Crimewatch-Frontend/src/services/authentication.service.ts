import { Injectable } from "@angular/core";

import { JwtHelperService } from "@auth0/angular-jwt";
import Moderator from "crimewatch-shared/Models/Moderator";
import Witness from "crimewatch-shared/Models/Witness";

@Injectable({
    providedIn: "root",
})
export class AuthenticationService {
    public isSignedin: any;
    constructor(private readonly jwtHelper: JwtHelperService) {}

    public SetToken(token: string) {
        if (!token) return;
        localStorage.setItem("token", token);
    }
    public RemoveToken(): boolean {
        localStorage.removeItem("token");
        this.isSignedin = false;
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
    public GetCurrentUser(): Witness | Moderator {
        const token = localStorage.getItem("token");
        if (!token) return null!;
        const decodedToken: any = this.jwtHelper.decodeToken(token);
        const user: Witness | Moderator = decodedToken.user;
        this.isSignedin = true;
        return user;
    }
}
