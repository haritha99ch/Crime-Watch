import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";
import { Observable } from "rxjs";
import * as Rx from "rxjs";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { AnonymousSubject } from "rxjs/internal/Subject";

@Injectable({
    providedIn: "root",
})
export class WebsocketService {
    private socket!: Socket<DefaultEventsMap, DefaultEventsMap>;
    constructor() {}

    public Connect(): Rx.Subject<MessageEvent> {
        this.socket = io("http://localhost:9090");
        const observable = new Observable((observer) => {
            this.socket.on("message", (data) => {
                console.log(`Received a message from the server ${data}`);
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        const observer = {
            next: (data: Object) => {
                this.socket.emit("message", JSON.stringify(data));
            },
        };
        return Rx.Subject.create(observer, observable);
    }
}
