import { Socket } from "socket.io";

// Types not exported from socket.io
type MiddlewareNext = (err?: Error | undefined) => void;

const API_KEY = process.env.LIVE_CHAT_API_KEY!;

export const verifyApiKey = (socket: Socket, next: MiddlewareNext) => {
  const apiKey = socket.handshake.auth.apiKey;
  if (apiKey === API_KEY) next();
  else next(new Error("Invalid API key, connection rejected"));
};

export const attachClient = (socket: Socket, next: MiddlewareNext) => {
  const jwt = socket.handshake.auth.jwt;
  if (!jwt) next(new Error("Client credentials invalid"));
  // const decodedJwt = jwt; // TODO
  // socket.clientId = "clientId"; // TODO get from jwt
};
