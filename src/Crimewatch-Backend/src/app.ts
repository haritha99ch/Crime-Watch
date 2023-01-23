import express, { Request, Response } from "express";
import Default from "./Configs/Default";
import DbContext from "./Context/DbContext";
import Routes from "./Routes/Routes";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";
import cors from "cors";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(
    cors({
        origin: "*",
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use("/API", Routes);
//use angular build
app.use(
    express.static(
        path.join(
            __dirname,
            "../../Crimewatch-Frontend/dist/crimewatch-frontend"
        )
    )
);
app.get("/*", (req: Request, res: Response) => {
    res.sendFile(
        path.join(
            __dirname,
            "../../Crimewatch-Frontend/dist/crimewatch-frontend/index.html"
        )
    );
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

//web socket config
let onlineUsers: { userId: string; socket: Socket }[] = [];
io.on("connection", (socket) => {
    console.log(`New connection`);
    socket.on("user_connected", (userId) => {
        console.log(`User ${userId} connected`);
        if (!onlineUsers.some((user) => user.userId === userId))
            onlineUsers.push({ userId, socket });
        console.log("online users");
        console.log(onlineUsers);
        io.emit(
            "update_users",
            onlineUsers.map((user) => user.userId)
        );
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        onlineUsers = onlineUsers.filter((user) => user.socket !== socket);
        console.log("online users");
        console.log(onlineUsers);
    });
    socket.on(
        "notification",
        (notification: { to: string; reportId: string; message: string }) => {
            console.log("revieved");
            console.log(notification);
            const user = onlineUsers.find(
                (user) => user.userId === notification.to
            );
            if (user) user.socket.emit("notification", notification);
        }
    );
});

httpServer.listen(
    Number(Default.server.port),
    Default.server.name,
    async () => {
        await DbContext.ConnectDbProd();
        console.log(httpServer.address());
    }
);
