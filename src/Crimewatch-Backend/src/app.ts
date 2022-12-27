import express from "express";
import Default from "./Configs/Default";
import cors from "cors";
import DbContext from "./Context/DbContext";
import Routes from "./Routes/Routes";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use("/API", Routes);

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
    socket.on("message", (socket) => {
        console.log(socket);
        io.emit("message", { type: "new-message", text: socket });
    });
});

httpServer.listen(Default.server.port!, async () => {
    await DbContext.ConnectDb();
    console.log(
        `Application listening at http://localhost:${Default.server.port!}`
    );
});
