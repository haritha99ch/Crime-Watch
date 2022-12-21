import { expect } from "chai";
import { connection } from "mongoose";
import DbContext from "../../src/Context/DbContext";

describe("mongo db test", () => {
    it("Should connect to the test db", async () => {
        const db = await DbContext.ConnectDbTest();
        expect(connection).not.null;
    });
});
