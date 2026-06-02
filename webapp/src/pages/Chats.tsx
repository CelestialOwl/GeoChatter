import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send,
  Search,
  Users,
  Camera,
  Menu,
  LogOut,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { EmptyState } from "@/components/ui/empty-state";
import { Loading, FullPageLoading } from "@/components/ui/loading";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useProfile, useUserList } from "@/hooks/useUsers";
import { useCreateRoom, useMessages, useCommunities } from "@/hooks/useChat";
import { isAuthenticated, useLogout } from "@/hooks/useAuth";
import { connectSocket, disconnectSocket } from "@/lib/socket";
import type { Message, User, Community } from "@/types";

export default function Chats() {
  const navigate = useNavigate();
  const logout = useLogout();

  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: users = [], isLoading: usersLoading } = useUserList();
  const { data: communities = [] } = useCommunities();
  const { data: fetchedMessages } = useMessages(roomId);
  const createRoom = useCreateRoom();

  // Auth guard
  useEffect(() => {
    if (!isAuthenticated()) navigate("/login");
  }, [navigate]);

  // Sync fetched messages
  useEffect(() => {
    if (fetchedMessages) setMessages(fetchedMessages);
  }, [fetchedMessages]);

  // Socket connection
  useEffect(() => {
    const socket = connectSocket();
    socket.on("message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      disconnectSocket();
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectUser = async (user: User) => {
    const result = await createRoom.mutateAsync(user._id);
    setActiveUser(result.user);
    setRoomId(result.chatId);
    setMessages([]);
    setSidebarOpen(false);
  };

  const handleSend = () => {
    if (!messageText.trim() || !roomId) return;
    const socket = connectSocket();
    socket.emit("chatMessage", {
      field: messageText,
      chatRoomId: roomId,
      email: localStorage.getItem("email"),
    });
    setMessageText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (profileLoading) return <FullPageLoading />;

  const chatUsers = users.filter((u) => profile?.chats.includes(u._id));
  const filteredChatUsers = chatUsers.filter(
    (u) =>
      !searchQuery ||
      u.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-80 border-r bg-card transition-transform duration-200
          md:relative md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-3">
              <Avatar
                src={profile?.img}
                alt={profile?.username}
                size="md"
              />
              <span className="font-semibold">{profile?.username}</span>
            </div>
            <div className="flex gap-1">
              <ThemeToggle />
              <Button variant="ghost" size="icon" title="Status">
                <Camera className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" title="Find users">
                <Users className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                title="Logout"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search chats..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* User List */}
          <div className="flex-1 overflow-y-auto">
            <h4 className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Messages
            </h4>
            {usersLoading ? (
              <Loading className="py-8" />
            ) : filteredChatUsers.length === 0 ? (
              <EmptyState
                title="No chats yet"
                description="Start a conversation!"
                className="py-8"
              />
            ) : (
              filteredChatUsers.map((user) => (
                <button
                  key={user._id}
                  onClick={() => handleSelectUser(user)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent ${
                    activeUser?._id === user._id ? "bg-accent" : ""
                  }`}
                >
                  <Avatar
                    src={user.img}
                    alt={user.username}
                    size="md"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{user.username}</p>
                    {user.distance != null && (
                      <p className="text-xs text-muted-foreground">
                        {user.distance.toFixed(1)} km away
                      </p>
                    )}
                  </div>
                </button>
              ))
            )}

            {/* Communities */}
            <h4 className="px-4 pb-2 pt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Communities
            </h4>
            {communities.length === 0 ? (
              <EmptyState
                title="No communities"
                description="Create one!"
                className="py-4"
              />
            ) : (
              communities.map((c: Community) => (
                <button
                  key={c._id}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent"
                >
                  <Avatar
                    fallback={c.name.charAt(0)}
                    alt={c.name}
                    size="md"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{c.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {c.description || `${c.users.length} members`}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex flex-1 flex-col">
        {/* Chat Header */}
        <header className="flex items-center gap-3 border-b px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          {activeUser ? (
            <>
              <Avatar
                src={activeUser.img}
                alt={activeUser.username}
                size="md"
              />
              <div>
                <p className="font-semibold">{activeUser.username}</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">GeoChatter</p>
          )}
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {!activeUser ? (
            <EmptyState
              icon={<MessageSquare className="h-12 w-12" />}
              title="Select a conversation"
              description="Choose a chat from the sidebar to start messaging"
              className="h-full"
            />
          ) : createRoom.isPending ? (
            <Loading className="h-full" />
          ) : messages.length === 0 ? (
            <EmptyState
              title="No messages yet"
              description="Send the first message!"
              className="h-full"
            />
          ) : (
            <>
              {messages.map((m, i) => (
                <ChatBubble
                  key={m._id || i}
                  text={m.text}
                  username={m.username}
                  time={m.time}
                  isOwn={m.username === profile?.username}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Message Input */}
        {activeUser && (
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                size="icon"
                disabled={!messageText.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
