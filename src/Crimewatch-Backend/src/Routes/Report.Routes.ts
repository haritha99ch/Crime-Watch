import express from "express";
import ReportController from "../Controllers/ReportController";
import VerifyToken from "../Middlewares/VerifyToken";

const ReportRouter = express.Router();

const reportController = new ReportController();

// /API/Report
const _create = "/Create";
const _getAll = "/GetAll";
const _get = "/Details/:id";
const _update = "/Update/:id";
const _delete = "/Delete/:id";
const _beMod = "/Moderator/:moderatorId/:reportId";
const _approve = "/Approve/:reportId";
const _decline = "/Decline/:reportId";
const _reReview = "/Review/:reportId";

ReportRouter.post(_create, reportController.Create.bind(reportController));
ReportRouter.get(_getAll, reportController.GetAll.bind(reportController));
ReportRouter.get(
    _get,
    VerifyToken,
    reportController.GetById.bind(reportController)
);
ReportRouter.patch(_update, reportController.UpdateById.bind(reportController));
ReportRouter.delete(
    _delete,
    reportController.DeleteById.bind(reportController)
);
ReportRouter.patch(
    _beMod,
    reportController.BeModeratorById.bind(reportController)
);
ReportRouter.patch(
    _approve,
    reportController.ApproveById.bind(reportController)
);
ReportRouter.patch(
    _decline,
    reportController.DeclineById.bind(reportController)
);
ReportRouter.patch(
    _reReview,
    reportController.RereviewById.bind(reportController)
);
export default ReportRouter;
