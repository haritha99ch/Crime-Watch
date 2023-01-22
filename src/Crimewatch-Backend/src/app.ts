import express, { Request, Response } from "express";
import Default from "./Configs/Default";
import DbContext from "./Context/DbContext";
import Routes from "./Routes/Routes";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();
app.use(express.json({ limit: "50mb" }));
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
let onlineUsers: { userId: string; socketId: string }[] = [];
io.on("connection", (socket) => {
    console.log(`New connection`);
    socket.on("newUser", (userid) => {
        if (!onlineUsers.some((user) => user.userId === userid))
            onlineUsers.push({ userId: userid, socketId: socket.id });
        console.log("online users");
        console.log(onlineUsers);
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected`);
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        console.log("online users");
        console.log(onlineUsers);
    });
    socket.on(
        "notification",
        (notification: { to: string; reportId: string; message: string }) => {
            console.log("revieved");

            console.log(notification);

            io.to(
                onlineUsers.find((user) => user.userId === notification.to)
                    ?.socketId!
            ).emit("notification", notification);
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
