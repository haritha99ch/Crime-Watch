import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";
import { Observable } from "rxjs";
import * as Rx from "rxjs";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { AuthenticationService } from "./authentication.service";

@Injectable({
    providedIn: "root",
})
export class WebsocketService {
    private socket: Socket;
    private userId: string = "0";

    constructor(private readonly authenticationService: AuthenticationService) {
        this.SetUserId();
        this.socket = io("http://localhost:8080", {
            forceNew: true,
            transports: ["polling"],
        });
        this.Connect();
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
    // private socket!: Socket<DefaultEventsMap, DefaultEventsMap>;
}
