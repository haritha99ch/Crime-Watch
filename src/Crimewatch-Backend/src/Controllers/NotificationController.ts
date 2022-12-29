import { ModeratorDocument } from "crimewatch-shared/Models/Moderator";
import Notification, {
    NotificationDocument,
} from "crimewatch-shared/Models/Notification";
import Report, { ReportDocument } from "crimewatch-shared/Models/Report";
import { WitnessDocument } from "crimewatch-shared/Models/Witness";
import { NextFunction, Request, Response } from "express";
import ModeratorModel from "../Models/ModeratorModel";
import WitnessModel from "../Models/WitnessModel";
import IRepository from "../Services/IRepository";
import NotificationService from "../Services/NotificationService";
import Repository from "../Services/Repository";

class NotificationController {
    private readonly notificationService: NotificationService;
    private readonly _witnessRepository: IRepository<WitnessDocument>;
    private readonly _moderatorRepository: IRepository<ModeratorDocument>;
    constructor() {
        this.notificationService = new NotificationService();
        this._witnessRepository = new Repository<WitnessDocument>(WitnessModel);
        this._moderatorRepository = new Repository<ModeratorDocument>(
            ModeratorModel
        );
    }

    public async Create(
        request: Request<{ id: string }, {}, Notification>,
        response: Response<NotificationDocument>,
        next: NextFunction
    ) {
        if (await this._witnessRepository.GetById(request.params.id)) {
            const newNotification =
                await this.notificationService.NewNotificationForWitness(
                    request.params.id,
                    request.body
                );
            return response.send(newNotification);
        }
        const newNotification =
            await this.notificationService.NewNotificationForModerator(
                request.params.id,
                request.body
            );
        return response.send(newNotification);
    }
    public async Seen(
        request: Request<{ id: string }, {}, Notification>,
        response: Response<boolean>,
        next: NextFunction
    ) {
        const notificationSeen =
            await this.notificationService.NotificationSeen(request.params.id);
        return response.send(notificationSeen);
    }
}
export default NotificationController;
