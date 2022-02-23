import http from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const PORT = 3000;

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use("/public", express.static(process.cwd() + "/src/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListening = () =>
  console.log(`✅ Server listening on: http://localhost:${PORT}`);

const httpServer = http.createServer(app); // http 분리
const wsServer = new Server(httpServer);

wsServer.on("connection", (socketWithFront) => {
  socketWithFront.on("enter_room", (roomName, showRoom) => {
    socketWithFront.join(roomName);
    showRoom();
    console.log(socketWithFront.rooms);
    socketWithFront.to(roomName).emit("welcome");
  });
});
httpServer.listen(PORT, handleListening);
