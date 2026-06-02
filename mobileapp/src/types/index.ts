export interface User {
  _id: string;
  email: string;
  username: string;
  img?: string;
  phone?: string;
  chats: string[];
  super_admin?: boolean;
  distance?: number;
}

export interface Message {
  _id?: string;
  text: string;
  username: string;
  time: string;
  userId?: string;
}

export interface ChatRoom {
  _id: string;
  users: string[];
}

export interface Community {
  _id: string;
  name: string;
  description?: string;
  admin: string;
  users: string[];
}

export interface Hobby {
  _id: string;
  name: string;
  user: string;
}

export interface Status {
  _id: string;
  user: string;
  img: string;
  createdAt: string;
}
