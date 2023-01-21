import express from "express";
import Default from "./Configs/Default";
import DbContext from "./Context/DbContext";
import Routes from "./Routes/Routes";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use("/API", Routes);
app.get("/", (req, res) => {
    return res.send("crime-watch-api");
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    },
});

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
const hostname = "0.0.0.0";
httpServer.listen(8080, async () => {
    await DbContext.ConnectDbProd();
    console.log(httpServer.address());
});
