import { faker } from "@faker-js/faker";
import Gender from "../../../Crimewatch-Shared/Enums/Gender";
import Province from "../../../Crimewatch-Shared/Enums/Province";
import Status from "../../../Crimewatch-Shared/Enums/Status";
import Moderator from "../../../Crimewatch-Shared/Models/Moderator";

export const moderatorPayload: Moderator = {
    User: {
        FirstName: faker.name.firstName(),
        LastName: faker.name.lastName(),
        DOB: faker.date.birthdate(),
        Age: Number(faker.random.numeric(2)),
        PhoneNumber: Number(faker.random.numeric(10)),
        Account: {
            Email: faker.internet.email(),
            Password: faker.internet.password(),
            IsModerator: true,
        },
        Gender: Gender.Male,
    },
    PoliceId: faker.word.verb.name,
    Province: Province.Uva,
};
