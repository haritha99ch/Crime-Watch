import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const MONGO_URL_TEST = process.env.MONGO_URL_TEST;
const MONGO_URL_PROD = process.env.MONGO_URL_PROD;
const SERVER_PORT = process.env.SERVER_PORT;
const SERVER_HOST = process.env.SERVER_HOST;

export default {
    mongo: {
        url: MONGO_URL,
        testurl: MONGO_URL_TEST,
        productionurl: MONGO_URL_PROD,
    },
    server: {
        name: SERVER_HOST,
        port: SERVER_PORT,
    },
};
