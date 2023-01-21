import { ModeratorDocument } from "../../../Crimewatch-Shared/Models/Moderator";
import Notification, {
    NotificationDocument,
} from "../../../Crimewatch-Shared/Models/Notification";
import { ReportDocument } from "../../../Crimewatch-Shared/Models/Report";
import { WitnessDocument } from "../../../Crimewatch-Shared/Models/Witness";
import NotificationViewModel from "../../../Crimewatch-Shared/ViewModels/NotificationViewModel";
import { UpdateQuery } from "mongoose";
import ModeratorModel from "../Models/ModeratorModel";
import NotificationModel from "../Models/NotificationModel";
import WitnessModel from "../Models/WitnessModel";
import IRepository from "./IRepository";
import Repository from "./Repository";

class NotificationService {
    private readonly _moderatorRepository: IRepository<ModeratorDocument>;
    private readonly _witnessRepository: IRepository<WitnessDocument>;
    private readonly _notificationRepository: IRepository<NotificationDocument>;
    constructor() {
        this._moderatorRepository = new Repository<ModeratorDocument>(
            ModeratorModel
        );
        this._witnessRepository = new Repository<WitnessDocument>(WitnessModel);
        this._notificationRepository = new Repository<NotificationDocument>(
            NotificationModel
        );
    }

    public async NewNotificationForWitness(
        witnessId: string,
        notification: Notification
    ): Promise<Notification> {
        const update: UpdateQuery<WitnessDocument> = {
            $push: { Notifications: notification },
        };
        await this._witnessRepository.UpdateById(witnessId, update);
        return notification;
    }
    public async NewNotificationForModerator(
        moderatorId: string,
        notification: Notification
    ): Promise<Notification> {
        const update: UpdateQuery<WitnessDocument> = {
            $push: { Notifications: notification },
        };
        await this._moderatorRepository.UpdateById(moderatorId, update);
        return notification;
    }
    public async NotificationSeen(notificationId: string): Promise<boolean> {
        const update: UpdateQuery<NotificationDocument> = {
            $set: { "Notifications.$[element].Seen": true },
        };
        const notificationSeen = await this._notificationRepository
            .UpdateById(notificationId, update)
            .then((doc) => {
                return true;
            })
            .catch((e) => {
                console.log(e);
                return false;
            });
        return notificationSeen;
    }
}
export default NotificationService;
