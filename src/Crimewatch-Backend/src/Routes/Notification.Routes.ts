import express from "express";
import NotificationController from "../Controllers/NotificationController";

const notificationController = new NotificationController();

const NotificationRouter = express.Router();

const _createForWitness = "/Create/Witness/:id";
const _createForModerator = "/Create/Moderator/:id";
const _seen = "/Seen/:id";

NotificationRouter.post(
    _createForWitness,
    notificationController.NewNotificationForWitness.bind(
        notificationController
    )
);
NotificationRouter.post(
    _createForModerator,
    notificationController.NewNotificationForModerator.bind(
        notificationController
    )
);
NotificationRouter.patch(
    _seen,
    notificationController.Seen.bind(notificationController)
);
export default NotificationRouter;
