import express from "express";
import Default from "./Configs/Default";
import cors from "cors";
import DbContext from "./Context/DbContext";
import Routes from "./Routes/Routes";
import { createServer } from "http";
import { Server } from "socket.io";
import User from "crimewatch-shared/Models/User";

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

let onlineUsers: { userId: string; socketId: string }[] = [];

io.on("connection", (socket) => {
    console.log(`User connected`);
    socket.on("newUser", (userid) => {
        if (!onlineUsers.some((user) => user.userId === userid))
            onlineUsers.push({ userId: userid, socketId: socket.id });
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected`);
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    });
    socket.on(
        "notification",
        (notification: { to: string; reportId: string; message: string }) => {
            io.to(
                onlineUsers.find((user) => user.userId === notification.to)
                    ?.socketId!
            ).emit("notification", notification);
        }
    );
});

httpServer.listen(Default.server.port!, async () => {
    await DbContext.ConnectDb();
    console.log(
        `Application listening at http://localhost:${Default.server.port!}`
    );
});
