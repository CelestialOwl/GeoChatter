interface user {
  id: number;
  username: string;
  room: number;
  userId: number;
}
const users: user[] = [];

// Join user to chat
function userJoin(id, username, room, userId) {
  const user: user = { id, username, room, userId };

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id: number) {
  return users.find((user) => user.id === id);
}

// User leaves chat
function userLeave(id: number) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room: number) {
  return users.filter((user) => user.room === room);
}

export { userJoin, getCurrentUser, userLeave, getRoomUsers };
