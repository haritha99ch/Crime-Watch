import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const MONGO_URL_TEST = process.env.MONGO_URL_TEST;
const SERVER_PORT = process.env.SERVER_PORT;

export default {
    mongo: {
        url: MONGO_URL,
        testurl: MONGO_URL_TEST,
    },
    server: {
        port: SERVER_PORT,
    },
};
