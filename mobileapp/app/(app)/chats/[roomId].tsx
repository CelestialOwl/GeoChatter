import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { Send } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "@/components/Avatar";
import { ChatBubble } from "@/components/ChatBubble";
import { EmptyState } from "@/components/EmptyState";
import { useMessages } from "@/hooks/useChat";
import { useProfile } from "@/hooks/useUsers";
import { connectSocket, disconnectSocket } from "@/lib/socket";
import { authActions } from "@/lib/storage";
import type { Message } from "@/types";

export default function ChatScreen() {
  const { roomId, username, img } = useLocalSearchParams<{
    roomId: string;
    username: string;
    img: string;
  }>();

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const { data: profile } = useProfile();
  const { data: fetchedMessages, isLoading } = useMessages(roomId || null);

  // Sync fetched messages
  useEffect(() => {
    if (fetchedMessages) setMessages(fetchedMessages);
  }, [fetchedMessages]);

  // Socket
  useEffect(() => {
    const socket = connectSocket();
    socket.on("message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("message");
      disconnectSocket();
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSend = () => {
    if (!text.trim() || !roomId) return;
    const socket = connectSocket();
    socket.emit("chatMessage", {
      field: text,
      chatRoomId: roomId,
      email: authActions.getEmail(),
    });
    setText("");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View className="flex-row items-center gap-2">
              <Avatar src={img} alt={username} size="sm" />
              <Text className="text-base font-semibold">{username}</Text>
            </View>
          ),
        }}
      />
      <SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={90}
        >
          {/* Messages */}
          {isLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#2563eb" />
            </View>
          ) : messages.length === 0 ? (
            <EmptyState
              title="No messages yet"
              description="Send the first message!"
            />
          ) : (
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item, i) => item._id || String(i)}
              renderItem={({ item }) => (
                <ChatBubble
                  text={item.text}
                  username={item.username}
                  time={item.time}
                  isOwn={item.username === profile?.username}
                />
              )}
              contentContainerClassName="px-4 py-2"
              onContentSizeChange={() =>
                flatListRef.current?.scrollToEnd({ animated: false })
              }
            />
          )}

          {/* Input */}
          <View className="flex-row items-center gap-2 border-t border-gray-100 px-4 py-3">
            <TextInput
              className="h-10 flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 text-base"
              placeholder="Type a message..."
              placeholderTextColor="#9ca3af"
              value={text}
              onChangeText={setText}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <Pressable
              onPress={handleSend}
              disabled={!text.trim()}
              className={`h-10 w-10 items-center justify-center rounded-full ${
                text.trim() ? "bg-primary-600" : "bg-gray-200"
              }`}
            >
              <Send size={18} color={text.trim() ? "#fff" : "#9ca3af"} />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
