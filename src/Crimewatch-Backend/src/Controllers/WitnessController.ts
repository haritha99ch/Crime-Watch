import Witness, {
    WitnessDocument,
} from "../../../Crimewatch-Shared/Models/Witness";
import SigninViewModel from "../../../Crimewatch-Shared/ViewModels/SigninViewModel";
import { Request, Response, NextFunction } from "express";
import WitnessModel from "../Models/WitnessModel";
import IRepository from "../Services/IRepository";
import Repository from "../Services/Repository";
import WitnessAccountService from "../Services/WitnessAccountService";
import jwt from "jsonwebtoken";
import { NotificationDocument } from "../../../Crimewatch-Shared/Models/Notification";
import NotificationService from "../Services/NotificationService";

class WitnessController {
    private readonly _witnessRepository: IRepository<WitnessDocument>;
    private readonly witnessAccountService: WitnessAccountService;
    private readonly notificationService: NotificationService;
    constructor() {
        this._witnessRepository = new Repository<WitnessDocument>(WitnessModel);
        this.witnessAccountService = new WitnessAccountService();
        this.notificationService = new NotificationService();
    }

    public async Create(
        request: Request<{}, {}, Witness>,
        response: Response<WitnessDocument>,
        next: NextFunction
    ) {
        const witness = await this._witnessRepository.Create(request.body);
        return response.send(witness);
    }
    public async GetById(
        request: Request<{ id: string }, {}>,
        response: Response<WitnessDocument | string>,
        next: NextFunction
    ) {
        const witness = await this._witnessRepository.GetById(
            request.params.id
        );
        return response.send(witness);
    }
    public async DeleteById(
        request: Request<{ id: string }, {}>,
        response: Response<boolean>,
        next: NextFunction
    ) {
        const witnessDeleted = await this._witnessRepository.DeleteById(
            request.params.id
        );
        return response.send(witnessDeleted);
    }
    public async Signin(
        request: Request<{}, {}, SigninViewModel>,
        response: Response<{ token: string }>,
        next: NextFunction
    ) {
        const witness = await this.witnessAccountService.Signin(request.body);
        if (!witness) return response.send(null!);
        const token = jwt.sign({ user: witness }, "key");
        return response.send({ token });
    }
}
export default WitnessController;
