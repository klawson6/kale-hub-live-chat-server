import "dotenv/config";

import { createServer } from "node:http";

import express, { Express } from "express";
import { Server } from "socket.io";

import { onConnection } from "./listeners/connection.js";
import { registerListeners, registerMiddleware } from "./setup.js";

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
registerMiddleware(io);

// Register connection actions
io.on("connection", (socket) => {
  onConnection(socket);
  registerListeners(socket);
});

// Open for connection
server.listen(PORT, () => {
  console.log(`Server running at ${DOMAIN}:${PORT}`);
});
