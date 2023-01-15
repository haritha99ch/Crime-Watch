import express from "express";
import EvidenceController from "../Controllers/EvidenceController";
import VerifyToken from "../Middlewares/VerifyToken";

const EvidenceRouter = express.Router();

const evidenceController = new EvidenceController();

// /API/Evidence
const _create = "/Create/:reportId";
const _getAll = "/GetAll/:reportId";
const _get = "/Get/:evidenceId";
const _delete = "/Delete/:reportId/:evidenceId";
const _beMod = "/Moderator/:moderatorId/:evidenceId";
const _approve = "/Approve/:evidenceId";
const _decline = "/Decline/:evidenceId";
const _reReview = "/Review/:evidenceId";

EvidenceRouter.post(
    _create,
    VerifyToken,
    evidenceController.CreateForReport.bind(evidenceController)
);
EvidenceRouter.get(
    _getAll,
    evidenceController.GetAllForReport.bind(evidenceController)
);
EvidenceRouter.get(
    _get,
    evidenceController.GetEvidenceById.bind(evidenceController)
);
EvidenceRouter.delete(
    _delete,
    VerifyToken,
    evidenceController.RemoveFromReport.bind(evidenceController)
);
EvidenceRouter.patch(
    _beMod,
    VerifyToken,
    evidenceController.BeModeratorById.bind(evidenceController)
);
EvidenceRouter.patch(
    _approve,
    VerifyToken,
    evidenceController.ApproveById.bind(evidenceController)
);
EvidenceRouter.patch(
    _decline,
    VerifyToken,
    evidenceController.DeclineById.bind(evidenceController)
);
EvidenceRouter.patch(
    _reReview,
    VerifyToken,
    evidenceController.RereviewById.bind(evidenceController)
);
export default EvidenceRouter;
