import express from "express";
import VerifyToken from "../Middlewares/VerifyToken";
import EvidenceRouter from "./Evidence.Routes";
import ModeratorRouter from "./Moderator.Routes";
import NotificationRouter from "./Notification.Routes";
import ReportRouter from "./Report.Routes";
import WitnessRouter from "./Witness.Routes";

const Routes = express.Router();

// /API
Routes.use("/Witness", WitnessRouter);
Routes.use("/Moderator", ModeratorRouter);
Routes.use("/Report", ReportRouter);
Routes.use("/Evidence", EvidenceRouter);
Routes.use("/Notification", NotificationRouter);

export default Routes;