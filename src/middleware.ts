import { Socket } from "socket.io";

// Types not exported from socket.io
type MiddlewareNext = (err?: Error | undefined) => void;

const API_KEY = process.env.LIVE_CHAT_API_KEY!;

export const VerifyApiKey = (socket: Socket, next: MiddlewareNext) => {
  const apiKey = socket.handshake.auth.apiKey;
  if (apiKey === API_KEY) next();
  else next(new Error("Invalid API key, connection rejected"));
};
