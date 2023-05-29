import Users from "../models/Users.js";
import { userJoin } from "../utils/users.js";

export default function JoinRoom(socket) {
  socket.on("joinRoom", async ({ username, room, email }) => {
    const myUser = await Users.findOne({ email: email });
    const user = userJoin(socket.id, username, room, myUser._id || "default");

    socket.join(user.room);
  });
}
