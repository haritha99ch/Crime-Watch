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
    private socket;
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

    public connect(): Rx.Subject<MessageEvent> {
        this.socket = io("https://crime-watch-375407.as.r.appspot.com", {
            forceNew: true,
            transports: ["polling"],
        });
        const currentUserId = this.authenticationService.GetCurrentUser()?._id;
        if (currentUserId) {
            console.log(currentUserId);

            this.socket.emit("newUser", currentUserId);
        }
        const observable = new Observable((observer) => {
            this.socket.on("notification", (data) => {
                console.log(`Received a notification from the server ${data}`);
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        const observer = {
            next: (data: { to: string; reportId: string; message: string }) => {
                this.socket.emit("notification", data);
            },
        };
        return Rx.Subject.create(observer, observable);
    }
}
