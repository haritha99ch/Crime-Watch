import Witness, {
    WitnessDocument,
} from "../../../Crimewatch-Shared/Models/Witness";
import SigninViewModel from "../../../Crimewatch-Shared/ViewModels/SigninViewModel";
import { FilterQuery } from "mongoose";
import WitnessModel from "../Models/WitnessModel";
import IRepository from "./IRepository";
import Repository from "./Repository";

class WitnessAccountService {
    private readonly _witnessRepository: IRepository<WitnessDocument>;
    constructor() {
        this._witnessRepository = new Repository<WitnessDocument>(WitnessModel);
    }
    public async Signin(signin: SigninViewModel): Promise<WitnessDocument> {
        const filter: FilterQuery<WitnessDocument> = {
            $and: [
                { "User.Account.Email": signin.Email },
                { "User.Account.Password": signin.Password },
            ],
        };
        const witness = await this._witnessRepository.GetByFilter(filter);
        return witness;
    }
}
export default WitnessAccountService;
