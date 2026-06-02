import { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MessageCircle } from "lucide-react-native";
import { Input, Button } from "@/components/ui";
import { useSignup } from "@/hooks/useAuth";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const signup = useSignup();

  const handleSubmit = () => {
    if (!email || !password || !username) return;
    signup.mutate({ email, password, username });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerClassName="flex-1 justify-center px-6"
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="mb-8 items-center">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-primary-600">
              <MessageCircle size={32} color="#fff" />
            </View>
            <Text className="text-2xl font-bold text-gray-900">
              Create an account
            </Text>
            <Text className="mt-1 text-sm text-gray-500">
              Join GeoChatter today
            </Text>
          </View>

          {/* Form */}
          <View className="gap-4">
            <Input
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <Input
              label="Username"
              placeholder="johndoe"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
            <Input
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="new-password"
            />

            {signup.error && (
              <Text className="text-sm text-red-500">
                Failed to create account. Try a different email.
              </Text>
            )}

            <Button
              title={signup.isPending ? "Creating account..." : "Sign up"}
              onPress={handleSubmit}
              loading={signup.isPending}
              disabled={!email || !password || !username}
            />
          </View>

          {/* Footer */}
          <View className="mt-6 items-center">
            <Link href="/(auth)/signin" asChild>
              <Pressable>
                <Text className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <Text className="font-semibold text-primary-600">
                    Sign in
                  </Text>
                </Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
