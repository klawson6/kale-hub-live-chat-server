import { Socket } from "socket.io";

export enum MessageEvents {
  MESSAGE_USER = "message::user",
}

type Message = {
  to: string;
  content: {
    message: string;
    media: Array<string>;
  };
};

export function onMessageUser(socket: Socket, message: Message): void {
  console.log(`Client sending a message to a single client`, message);
  socket.to(message.to).emit(MessageEvents.MESSAGE_USER, {
    from: socket.data.clientId,
    content: message.content,
  });
}
