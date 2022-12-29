import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import Notification from "crimewatch-shared/Models/Notification";
import NotificationViewModel from "crimewatch-shared/ViewModels/NotificationViewModel";
import { map, Observable, Subject } from "rxjs";
import { WebsocketService } from "./websocket.service";

const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
    }),
};

@Injectable({
    providedIn: "root",
})
export class NotificationService {
    messages!: Subject<any>;
    constructor(
        private readonly websocketService: WebsocketService,
        private readonly http: HttpClient
    ) {
        this.messages = <Subject<any>>websocketService.Connect().pipe(
            map((response: any): any => {
                return response;
            })
        );
    }

    public SendMessage(message: any) {
        this.messages.next(message);
    }

    public Create(
        userId: string,
        notification: Notification
    ): Observable<NotificationViewModel> {
        return this.http.post<NotificationViewModel>(
            `/API/Notification/Create/${userId}`,
            notification,
            httpOptions
        );
    }
    public Seen(notificationId: string): Observable<boolean> {
        return this.http.patch<boolean>(
            `/API/Notification/Seen/${notificationId}`,
            notificationId,
            httpOptions
        );
    }
}
