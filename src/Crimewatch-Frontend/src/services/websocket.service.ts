import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";
import { Observable } from "rxjs";
import * as Rx from "rxjs";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { AnonymousSubject } from "rxjs/internal/Subject";
import { AuthenticationService } from "./authentication.service";

@Injectable({
    providedIn: "root",
})
export class WebsocketService {
    private socket!: Socket<DefaultEventsMap, DefaultEventsMap>;
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {}

    public Connect(): Rx.Subject<MessageEvent> {
        this.socket = io("http://localhost:8080");
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
