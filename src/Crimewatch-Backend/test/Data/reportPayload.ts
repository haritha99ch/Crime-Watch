import { faker } from "@faker-js/faker";
import Province from "../../../Crimewatch-Shared/Enums/Province";
import Status from "../../../Crimewatch-Shared/Enums/Status";
import Report from "../../../Crimewatch-Shared/Models/Report";
import Image1 from "./Image1";

export const reportPayload: Report = {
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
    Categories: ["car", "bike", "accident"],
    Evidences: [],
    Status: Status.Pending,
    Moderator: null!,
    ModeratorNote: "",
    Author: null!,
    File: {
        File: Image1.data.toString(),
    },
};
