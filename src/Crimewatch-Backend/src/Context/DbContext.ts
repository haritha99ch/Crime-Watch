import mongoose, { connection } from "mongoose";
import Default from "../Configs/Default";

export default {
    async ConnectDb() {
        const con = await mongoose
            .connect(Default.mongo.url!)
            .then(() => {
                console.log("Connected to mongodb");
                return connection;
            })
            .catch((e) => {
                console.log(e);
                return false;
            });
    },
    async ConnectDbProd() {
        const con = await mongoose
            .connect(Default.mongo.productionurl!)
            .then(() => {
                console.log("Connected to mongodb");
                return connection;
            })
            .catch((e) => {
                console.log(e);
                return false;
            });
    },
    async DisconnectDb() {
        await connection.close();
    },
    async ConnectDbTest(): Promise<boolean | mongoose.Connection> {
        const con = await mongoose
            .connect(Default.mongo.testurl!)
            .then(async () => {
                await console.log("Connected to mongodb testing");
                return connection;
            })
            .catch(async (e) => {
                await console.log(e);
                return false;
            });
        return con;
    },
};
