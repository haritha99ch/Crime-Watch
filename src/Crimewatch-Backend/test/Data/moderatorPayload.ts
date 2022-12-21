import { faker } from "@faker-js/faker";
import Province from "crimewatch-shared/Enums/Province";
import Status from "crimewatch-shared/Enums/Status";
import Moderator from "crimewatch-shared/Models/Moderator";

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
    },
    PoliceId: faker.word.verb.name,
    Province: Province.Uva,
};
