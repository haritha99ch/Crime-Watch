import Moderator from "../../../Crimewatch-Shared/Models/Moderator";
import Witness from "../../../Crimewatch-Shared/Models/Witness";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default (request: Request, response: Response, next: NextFunction) => {
    // next();
    const bearerHeader = request.headers["authorization"];
    if (typeof bearerHeader === "undefined") return response.sendStatus(403);
    try {
        const baerer = bearerHeader.split(" ");
        const token = baerer[1];
        const decoded: any = jwt.verify(token, "key");

        // request.body.isModerator = decoded.User.IsModerator;
        // console.log(request.body.isModerator);
    } catch (e) {
        return response.sendStatus(403);
    }
    next();
};
