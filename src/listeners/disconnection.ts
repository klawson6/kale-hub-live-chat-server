import { DisconnectReason } from "socket.io";

export function onDisconnection(disconnectReason: DisconnectReason): void {
  console.log(`Client disconnected for reason: ${disconnectReason}`);
}
