import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";
import { AuthenticationService } from "./authentication.service";

@Injectable({
    providedIn: "root",
})
export class WebsocketService {
    private socket: Socket;
    private userId: string = "0";

    constructor(private readonly authenticationService: AuthenticationService) {
        this.Disconnect();
        this.SetUserId();
        this.socket = io("http://localhost:8080");
        this.Connect();
    }
    private Disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
    private SetUserId() {
        this.userId = this.authenticationService.GetCurrentUser()?._id;
    }

    private Connect() {
        this.socket.emit("user_connected", this.userId);
    }

    on(eventName: string, callback: (data: any) => void) {
        this.socket.on(eventName, callback);
    }

    emit(eventName: string, data: any) {
        this.socket.emit(eventName, data);
    }
}
