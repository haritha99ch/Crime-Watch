import Moderator, {
    ModeratorDocument,
} from "../../../Crimewatch-Shared/Models/Moderator";
import SigninViewModel from "../../../Crimewatch-Shared/ViewModels/SigninViewModel";
import { Request, Response, NextFunction } from "express";
import IRepository from "../Services/IRepository";
import Repository from "../Services/Repository";
import ModeratorAccountService from "../Services/ModeratorAccountService";
import ModeratorModel from "../Models/ModeratorModel";
import jwt from "jsonwebtoken";

class ModeratorController {
    private readonly _moderatorRepository: IRepository<ModeratorDocument>;
    private readonly moderatorAccountService: ModeratorAccountService;
    constructor() {
        this._moderatorRepository = new Repository<ModeratorDocument>(
            ModeratorModel
        );
        this.moderatorAccountService = new ModeratorAccountService();
    }

    public async Create(
        request: Request<{}, {}, Moderator>,
        response: Response<ModeratorDocument>,
        next: NextFunction
    ) {
        const moderator = await this._moderatorRepository.Create(request.body);
        return response.send(moderator);
    }
    public async GetById(
        request: Request<{ id: string }, {}>,
        response: Response<ModeratorDocument | string>,
        next: NextFunction
    ) {
        const moderator = await this._moderatorRepository.GetById(
            request.params.id
        );
        return response.send(moderator);
    }
    public async DeleteById(
        request: Request<{ id: string }, {}>,
        response: Response<boolean>,
        next: NextFunction
    ) {
        const moderatorDeleted = await this._moderatorRepository.DeleteById(
            request.params.id
        );
        return response.send(moderatorDeleted);
    }
    public async Signin(
        request: Request<{}, {}, SigninViewModel>,
        response: Response<{ token: string }>,
        next: NextFunction
    ) {
        const moderator = await this.moderatorAccountService.Signin(
            request.body
        );
        if (!moderator) return response.send(null!);
        const token = jwt.sign({ user: moderator }, "key");
        return response.send({ token });
    }
}
export default ModeratorController;
