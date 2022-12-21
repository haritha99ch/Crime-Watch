import { expect } from "chai";
import { ModeratorDocument } from "crimewatch-shared/Models/Moderator";
import { WitnessDocument } from "crimewatch-shared/Models/Witness";
import ModeratorModel from "../../src/Models/ModeratorModel";
import WitnessModel from "../../src/Models/WitnessModel";
import Repository from "../../src/Services/Repository";
import { witnessPayload } from "../Data/witnessPayload";
import { moderatorPayload } from "../Data/moderatorPayload";

describe("create a new witness", () => {
    it("Should insert a witness and returns the document", async () => {
        const newWitness = witnessPayload;
        const _witnessRepository = new Repository<WitnessDocument>(
            WitnessModel
        );
        const insertWitness = await _witnessRepository.Create(newWitness);
        expect(newWitness.User.FirstName).to.equals(
            insertWitness.User.FirstName
        );
    });
});

describe("create a new moderator", () => {
    it("Should insert a moderator and returns the document", async () => {
        const newModerator = moderatorPayload;
        const _moderatorRepository = new Repository<ModeratorDocument>(
            ModeratorModel
        );
        const insertModerator = await _moderatorRepository.Create(newModerator);
        expect(newModerator.User.FirstName).to.equals(
            insertModerator.User.FirstName
        );
    });
});
