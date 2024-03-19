import { Socket } from "socket.io";

// Types not exported from socket.io
type MiddlewareNext = (err?: Error | undefined) => void;

const API_KEY = process.env.LIVE_CHAT_API_KEY!;

export const verifyApiKey = (socket: Socket, next: MiddlewareNext) => {
  const apiKey = socket.handshake.auth.apiKey;
  apiKey === API_KEY
    ? next()
    : next(new Error("Invalid API key, connection rejected"));
};

export const attachClient = (socket: Socket, next: MiddlewareNext) => {
  const clientId = socket.handshake.auth.clientId;
  if (!clientId) next(new Error("Client ID not provided, connection rejected"));
  socket.data.clientId = clientId;
  next();
};
