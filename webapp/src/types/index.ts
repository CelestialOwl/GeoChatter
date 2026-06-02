export interface User {
  _id: string;
  email: string;
  username?: string;
  img?: string;
  latitude?: string;
  longitude?: string;
  chats: string[];
  hobbies: Hobby[];
  super_admin?: boolean;
  distance?: number;
}

export interface Hobby {
  name: string;
  selected: boolean;
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
  private: boolean;
  lastMessage?: string;
  users: string[];
  messages: Message[];
}

export interface Community {
  _id: string;
  name: string;
  description?: string;
  private?: boolean;
  is_disbanded?: boolean;
  img?: string;
  users: CommunityUser[];
  messages: Message[];
  userDetails?: User[];
}

export interface CommunityUser {
  _id: string;
  userId: string;
  is_mod: boolean;
  details?: User;
}

export interface Status {
  _id: string;
  image: string;
  time: string;
  userId: string;
}
