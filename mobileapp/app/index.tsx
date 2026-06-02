import { Redirect } from "expo-router";
import { useAuthStore } from "@/lib/storage";

export default function Index() {
  const token = useAuthStore((s) => s.token);

  if (token) {
    return <Redirect href="/(app)/chats" />;
  }
  return <Redirect href="/(auth)/signin" />;
}
