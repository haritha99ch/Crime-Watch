import { Schema } from "mongoose";
import Evidence from "../Models/Evidence";
import Moderator from "../Models/Moderator";
import Witness from "../Models/Witness";

class EvidenceViewModel extends Evidence {
    _id?: string;
    override Author!: Witness & { _id: Schema.Types.ObjectId };
    override Moderator?: Moderator & { _id: Schema.Types.ObjectId };
}
export default EvidenceViewModel;
