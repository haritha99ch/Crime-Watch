import Moderator from "crimewatch-shared/Models/Moderator";
import Witness from "crimewatch-shared/Models/Witness";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default (request: Request, response: Response, next: NextFunction) => {
    next();
    const bearerHeader = request.headers["authorization"];
    if (typeof bearerHeader === "undefined") return response.sendStatus(403);
    try {
        const baerer = bearerHeader.split(" ");
        const token = baerer[1];
        const decoded = jwt.verify(token, "key");
        request.body = decoded;
    } catch (e) {
        return response.sendStatus(403);
    }
    next();
};
