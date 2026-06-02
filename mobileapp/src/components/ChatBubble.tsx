import { View, Text } from "react-native";

interface ChatBubbleProps {
  text: string;
  username: string;
  time: string;
  isOwn: boolean;
}

export function ChatBubble({ text, username, time, isOwn }: ChatBubbleProps) {
  return (
    <View className={`mb-3 max-w-[80%] ${isOwn ? "self-end" : "self-start"}`}>
      {!isOwn && (
        <Text className="mb-1 text-xs font-medium text-gray-500">
          {username}
        </Text>
      )}
      <View
        className={`rounded-2xl px-4 py-2 ${
          isOwn
            ? "rounded-br-sm bg-primary-600"
            : "rounded-bl-sm bg-gray-100"
        }`}
      >
        <Text className={`text-sm ${isOwn ? "text-white" : "text-gray-900"}`}>
          {text}
        </Text>
      </View>
      <Text
        className={`mt-1 text-[10px] text-gray-400 ${
          isOwn ? "text-right" : "text-left"
        }`}
      >
        {time}
      </Text>
    </View>
  );
}
