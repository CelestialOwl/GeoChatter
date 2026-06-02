import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MessageCircle } from "lucide-react-native";
import { useProfile, useUserList } from "@/hooks/useUsers";
import { useCreateRoom } from "@/hooks/useChat";
import { UserListItem } from "@/components/UserListItem";
import { EmptyState } from "@/components/EmptyState";
import type { User } from "@/types";

export default function ChatListScreen() {
  const router = useRouter();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: users = [], isLoading: usersLoading } = useUserList();
  const createRoom = useCreateRoom();

  const handleUserPress = async (user: User) => {
    const result = await createRoom.mutateAsync(user._id);
    router.push({
      pathname: "/(app)/chats/[roomId]",
      params: {
        roomId: result.chatId,
        username: result.user.username,
        img: result.user.img || "",
      },
    });
  };

  if (profileLoading || usersLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  const chatUsers = users.filter((u) => profile?.chats.includes(u._id));

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="border-b border-gray-100 px-5 pb-4 pt-2">
        <Text className="text-2xl font-bold text-gray-900">Chats</Text>
        <Text className="mt-0.5 text-sm text-gray-500">
          {chatUsers.length} conversation{chatUsers.length !== 1 ? "s" : ""}
        </Text>
      </View>

      {/* List */}
      {chatUsers.length === 0 ? (
        <EmptyState
          icon={<MessageCircle size={48} color="#9ca3af" />}
          title="No chats yet"
          description="Start chatting with nearby users!"
        />
      ) : (
        <FlatList
          data={chatUsers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <UserListItem
              user={item}
              onPress={() => handleUserPress(item)}
            />
          )}
          contentContainerClassName="pb-4"
        />
      )}

      {/* All Users section */}
      {users.length > chatUsers.length && (
        <View className="border-t border-gray-100">
          <Text className="px-5 pb-2 pt-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Nearby Users
          </Text>
          <FlatList
            data={users.filter((u) => !profile?.chats.includes(u._id))}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <UserListItem
                user={item}
                onPress={() => handleUserPress(item)}
              />
            )}
            contentContainerClassName="pb-4"
            scrollEnabled={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
