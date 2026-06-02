import { Pressable, View, Text } from "react-native";
import { Avatar } from "./Avatar";
import type { User } from "@/types";

interface UserListItemProps {
  user: User;
  active?: boolean;
  onPress: () => void;
}

export function UserListItem({ user, active, onPress }: UserListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center gap-3 px-4 py-3 ${
        active ? "bg-primary-50" : "active:bg-gray-50"
      }`}
    >
      <Avatar src={user.img} alt={user.username} size="md" />
      <View className="flex-1">
        <Text className="text-base font-medium text-gray-900">
          {user.username}
        </Text>
        {user.distance != null && (
          <Text className="text-xs text-gray-500">
            {user.distance.toFixed(1)} km away
          </Text>
        )}
      </View>
    </Pressable>
  );
}
