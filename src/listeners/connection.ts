import { Socket } from "socket.io";

export function onConnection(socket: Socket): void {
  socket.join(socket.data.clientId); // Join a room to recieve direct messages
}
