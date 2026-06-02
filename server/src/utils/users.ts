interface SocketUser {
  id: string;
  username: string;
  room: string;
  userId: string;
}

const users: SocketUser[] = [];

export function userJoin(
  id: string,
  username: string,
  room: string,
  userId: string
): SocketUser {
  const user: SocketUser = { id, username, room, userId };
  users.push(user);
  return user;
}

export function getCurrentUser(id: string): SocketUser | undefined {
  return users.find((user) => user.id === id);
}

export function userLeave(id: string): SocketUser | undefined {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
  return undefined;
}

export function getRoomUsers(room: string): SocketUser[] {
  return users.filter((user) => user.room === room);
}
