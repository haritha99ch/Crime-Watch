import express from "express";
import ModeratorController from "../Controllers/ModeratorController";

const moderatorController = new ModeratorController();

const _create = "/Create";
const _details = "/Details/:id";
const _delete = "/Delete/:id";
const _signin = "/Signin";

const ModeratorRouter = express.Router();

// /API/Moderator
ModeratorRouter.post(
    _create,
    moderatorController.Create.bind(moderatorController)
);
ModeratorRouter.get(
    _details,
    moderatorController.GetById.bind(moderatorController)
);
ModeratorRouter.delete(
    _delete,
    moderatorController.DeleteById.bind(moderatorController)
);
ModeratorRouter.get(
    _signin,
    moderatorController.Signin.bind(moderatorController)
);
export default ModeratorRouter;
