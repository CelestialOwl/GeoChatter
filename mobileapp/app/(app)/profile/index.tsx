import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogOut, MapPin, Heart } from "lucide-react-native";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui";
import { useProfile } from "@/hooks/useUsers";
import { useHobbies } from "@/hooks/useChat";
import { useLogout } from "@/hooks/useAuth";

export default function ProfileScreen() {
  const { data: profile, isLoading } = useProfile();
  const { data: hobbies = [] } = useHobbies();
  const logout = useLogout();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView contentContainerClassName="pb-12">
        {/* Header */}
        <View className="items-center border-b border-gray-100 pb-6 pt-8">
          <Avatar src={profile?.img} alt={profile?.username} size="lg" />
          <Text className="mt-3 text-xl font-bold text-gray-900">
            {profile?.username}
          </Text>
          <Text className="mt-0.5 text-sm text-gray-500">
            {profile?.email}
          </Text>
        </View>

        {/* Hobbies */}
        <View className="px-5 pt-6">
          <View className="mb-3 flex-row items-center gap-2">
            <Heart size={16} color="#6b7280" />
            <Text className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Hobbies
            </Text>
          </View>
          {hobbies.length === 0 ? (
            <Text className="text-sm text-gray-400">No hobbies added yet</Text>
          ) : (
            <View className="flex-row flex-wrap gap-2">
              {hobbies.map((hobby, i) => (
                <View
                  key={i}
                  className="rounded-full bg-primary-50 px-3 py-1.5"
                >
                  <Text className="text-sm font-medium text-primary-700">
                    {typeof hobby === "string" ? hobby : (hobby as { name: string }).name}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Location */}
        <View className="px-5 pt-6">
          <View className="mb-3 flex-row items-center gap-2">
            <MapPin size={16} color="#6b7280" />
            <Text className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Location
            </Text>
          </View>
          <Text className="text-sm text-gray-600">
            Location sharing is enabled
          </Text>
        </View>

        {/* Logout */}
        <View className="mt-10 px-5">
          <Button title="Sign out" variant="secondary" onPress={logout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
