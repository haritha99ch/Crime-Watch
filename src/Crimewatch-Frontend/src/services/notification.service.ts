import { Injectable } from "@angular/core";
import { map, Subject } from "rxjs";
import { WebsocketService } from "./websocket.service";

@Injectable({
    providedIn: "root",
})
export class NotificationService {
    messages!: Subject<any>;
    constructor(private readonly websocketService: WebsocketService) {
        this.messages = <Subject<any>>websocketService.Connect().pipe(
            map((response: any): any => {
                return response;
            })
        );
    }

    public SendMessage(message: any) {
        this.messages.next(message);
    }
}
