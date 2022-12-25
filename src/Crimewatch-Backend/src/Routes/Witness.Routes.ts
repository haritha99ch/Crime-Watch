import express from "express";
import WitnessController from "../Controllers/WitnessController";

const witnessController = new WitnessController();

// /API/Witness
const _create = "/Create";
const _details = "/Details/:id";
const _delete = "/Delete/:id";
const _signin = "/Signin";

const WitnessRouter = express.Router();

WitnessRouter.post(_create, witnessController.Create.bind(witnessController));
WitnessRouter.get(_details, witnessController.GetById.bind(witnessController));
WitnessRouter.delete(
    _delete,
    witnessController.DeleteById.bind(witnessController)
);
WitnessRouter.post(_signin, witnessController.Signin.bind(witnessController));
export default WitnessRouter;
