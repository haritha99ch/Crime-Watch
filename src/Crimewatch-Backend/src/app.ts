import express from "express";
import Default from "./Configs/Default";
import DbContext from "./Context/DbContext";
import Routes from "./Routes/Routes";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use("/API", Routes);

app.listen(Default.server.port!, async () => {
    await DbContext.ConnectDb();
    console.log(
        `Application listening at http://localhost:${Default.server.port!}`
    );
});
