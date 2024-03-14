import { Socket } from "socket.io";

function recoverConnection(_: Socket): void {
  console.log("Client connection recovered");
}

function newConnection(_: Socket): void {
  console.log("New client connected");
}

export function onConnection(socket: Socket): void {
  if (socket.recovered) recoverConnection(socket);
  else newConnection(socket);
}
