import { Server, Socket } from "socket.io";

import { onDisconnection } from "./listeners/disconnection.js";
import { attachClient, verifyApiKey } from "./middleware.js";

export const registerMiddleware = (io: Server): void => {
  io.use((socket, next) => verifyApiKey(socket, next));
  io.use((socket, next) => attachClient(socket, next));
};

export const registerListeners = (socket: Socket): void => {
  socket.on("disconnect", (disconnectReason) =>
    onDisconnection(disconnectReason)
  );

  socket.on("message::user", (msg) => {
    console.log(`Message: ${JSON.stringify(msg)}`);
  });
};
