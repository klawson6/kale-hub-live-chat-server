import { Server, Socket } from "socket.io";

import { onDisconnection } from "./listeners/disconnection.js";
import { VerifyApiKey } from "./middleware.js";

export const registerMiddleware = (io: Server): void => {
  io.use((socket, next) => VerifyApiKey(socket, next));
};

export const registerListeners = (socket: Socket): void => {
  socket.on("disconnect", (disconnectReason) =>
    onDisconnection(disconnectReason)
  );

  socket.on("message_user", (msg) => {
    console.log(`Message: ${JSON.stringify(msg)}`);
  });
};
