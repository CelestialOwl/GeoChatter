import { Socket } from "socket.io";
import User from "../models/Users.js";
import { userJoin } from "../utils/users.js";

interface JoinRoomPayload {
  username: string;
  room: string;
  email: string;
}

export default function JoinRoom(socket: Socket): void {
  socket.on("joinRoom", async ({ username, room, email }: JoinRoomPayload) => {
    try {
      const myUser = await User.findOne({ email });
      const user = userJoin(socket.id, username, room, myUser?._id?.toString() || "default");

      socket.join(user.room);
    } catch (err) {
      console.error("Error joining room:", err);
    }
  });
}
