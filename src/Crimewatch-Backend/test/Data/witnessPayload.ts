import Witness from "crimewatch-shared/Models/Witness";
import { faker } from "@faker-js/faker";
import Gender from "crimewatch-shared/Enums/Gender";

export const witnessPayload: Witness = {
    User: {
        FirstName: faker.name.firstName(),
        LastName: faker.name.lastName(),
        DOB: faker.date.birthdate(),
        Age: Number(faker.random.numeric(2)),
        PhoneNumber: Number(faker.random.numeric(10)),
        Account: {
            Email: faker.internet.email(),
            Password: faker.internet.password(),
            IsModerator: false,
        },
        Gender: Gender.Female,
    },
};
