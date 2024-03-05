import express, { Express } from "express";
import { createServer } from "node:http";
import "dotenv/config";
import { Server } from "socket.io";
import { VerifyApiKey } from "./middleware.js";

// Ensure env vars exist
const DOMAIN = process.env.DOMAIN!;
const PORT = process.env.PORT!;

// Create server
const app: Express = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
});

// Register middleware
io.use((socket, next) => VerifyApiKey(socket, next));

// Register connection actions
io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("message_user", (msg) => {
    console.log(`Message: ${JSON.stringify(msg)}`);
  });
});

// Open for connection
server.listen(PORT, () => {
  console.log(`Server running at ${DOMAIN}:${PORT}`);
});
