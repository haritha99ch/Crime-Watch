import { faker } from "@faker-js/faker";
import Province from "crimewatch-shared/Enums/Province";
import Status from "crimewatch-shared/Enums/Status";
import Evidence from "crimewatch-shared/Models/Evidence";
import Image1 from "./Image1";

export const evidencePayload: Evidence = {
    Author: null!,
    Caption: faker.lorem.sentence(10),
    Body: faker.lorem.paragraph(10),
    Date: new Date(),
    Location: {
        No: faker.address.buildingNumber(),
        Street1: faker.address.street(),
        Street2: faker.address.street(),
        City: faker.address.cityName(),
        Province: Province.Uva,
    },
    Files: [{ File: Image1.data.toString() }],
    Status: Status.Pending,
};
