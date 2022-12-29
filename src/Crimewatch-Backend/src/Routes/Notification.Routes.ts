import express from "express";
import NotificationController from "../Controllers/NotificationController";

const notificationController = new NotificationController();

const NotificationRouter = express.Router();

const _create = "/Create/:id";
const _seen = "/Seen/:id";

NotificationRouter.post(
    _create,
    notificationController.Create.bind(notificationController)
);
NotificationRouter.patch(
    _seen,
    notificationController.Seen.bind(notificationController)
);
export default NotificationRouter;
