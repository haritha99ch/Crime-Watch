import { ModeratorDocument } from "crimewatch-shared/Models/Moderator";
import SigninViewModel from "crimewatch-shared/ViewModels/SigninViewModel";
import { FilterQuery } from "mongoose";
import ModeratorModel from "../Models/ModeratorModel";
import IRepository from "./IRepository";
import Repository from "./Repository";

class ModeratorAccountService {
    private readonly _moderatorRepository: IRepository<ModeratorDocument>;
    constructor() {
        this._moderatorRepository = new Repository<ModeratorDocument>(
            ModeratorModel
        );
    }
    public async Signin(signin: SigninViewModel): Promise<ModeratorDocument> {
        const filter: FilterQuery<ModeratorDocument> = {
            $and: [
                { "User.Account.Email": signin.Email },
                { "User.Account.Password": signin.Password },
            ],
        };
        const moderator = await this._moderatorRepository.GetByFilter(filter);
        return moderator;
    }
}
export default ModeratorAccountService;
