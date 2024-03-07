import express, { urlencoded } from "express";
import sequelize from "./configs/db.config";
import cors from "cors";
import Router from "./router";
import bodyParser from "body-parser";
import createTable from "./entities";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
import http from "http";
import { Server, Socket } from "socket.io"; //config file .env
dotenv.config();
//create server with express
const server = express();
//cookie
server.use(cookieParser());
//session
server.use(
  session({
    secret: "phuc",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
// file tĩnh
server.use(express.static("public"));
// ejs
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));
//port
const port = process.env.PORT || 8000;
//body-parser
server.use(urlencoded());
//body-parser
server.use(bodyParser.json());
//database
sequelize.authenticate();
//socket
const app = http.createServer(server);
const io = new Server(app, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "http://localhost:3001",
      "project-module-2.vercel.app",
    ],
  },
});

io.on("connection", (socket: Socket) => {
  console.log(socket.id);
  socket.on("blockUser", (userId: any) => {
    console.log(userId);

    io.emit("logout", userId);
  });
  socket.on("commentNew", (roomId: any) => {
    console.log(roomId);
    io.emit("comment", roomId);
  });
  socket.on("commentLike", (commentId: any) => {
    console.log(commentId);
    io.emit("like", commentId);
  });
  socket.on("commentDelete", (commentId: any) => {
    console.log(commentId);
    io.emit("delete", commentId);
  });
  // socket.on("disconnect", () => {
  //   console.log("Client disconnected");
  // });
});
//
//connect client
server.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5000",
      "project-module-2.vercel.app",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
//route on url
Router(server);
//create entity table db
createTable();
//address server
app.listen(port, () => {
  console.log(`server on port ${port}`);
});
