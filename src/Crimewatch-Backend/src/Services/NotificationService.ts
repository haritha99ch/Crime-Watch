import Moderator, {
    ModeratorDocument,
} from "crimewatch-shared/Models/Moderator";
import Notification, {
    NotificationDocument,
} from "crimewatch-shared/Models/Notification";
import { ReportDocument } from "crimewatch-shared/Models/Report";
import { WitnessDocument } from "crimewatch-shared/Models/Witness";
import NotificationViewModel from "crimewatch-shared/ViewModels/NotificationViewModel";
import { UpdateQuery } from "mongoose";
import ModeratorModel from "../Models/ModeratorModel";
import NotificationModel from "../Models/NotificationModel";
import ReportModel from "../Models/ReportModel";
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
    ): Promise<NotificationDocument> {
        const newNotification = await this._notificationRepository
            .Create(notification)
            .then(async (doc) => {
                const update: UpdateQuery<WitnessDocument> = {
                    $push: { "User.Notifications": doc._id },
                };
                await this._witnessRepository.UpdateById(witnessId, update);
                return doc;
            });
        return newNotification;
    }
    public async NewNotificationForModerator(
        moderatorId: string,
        notification: Notification
    ): Promise<NotificationViewModel> {
        const newNotification = await this._notificationRepository
            .Create(notification)
            .then(async (doc) => {
                const update: UpdateQuery<WitnessDocument> = {
                    $push: { "User.Notifications": doc._id },
                };
                await this._moderatorRepository.UpdateById(moderatorId, update);
                return doc;
            });
        return newNotification;
    }
    public async NotificationSeen(notificationId: string): Promise<Boolean> {
        const update: UpdateQuery<NotificationDocument> = {
            $set: { Seen: true },
        };
        const notificationSeen = await this._notificationRepository
            .UpdateById(notificationId, update)
            .then((doc) => {
                return true;
            })
            .catch((e) => {
                return false;
                console.log(e);
            });
        return notificationSeen;
    }
}
