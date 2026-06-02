import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { api } from "@/lib/api";
import { authActions } from "@/lib/storage";

interface SigninPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  email: string;
  password: string;
  username: string;
}

export function useSignin() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: SigninPayload) => {
      const res = await api.post<{ token: string; refreshToken: string }>("/signin", payload);
      return { token: res.data.token, refreshToken: res.data.refreshToken, email: payload.email };
    },
    onSuccess: async ({ token, refreshToken, email }) => {
      await authActions.login(token, email, refreshToken);
      router.replace("/(app)/chats");
    },
  });
}

export function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: SignupPayload) => {
      const res = await api.post("/signup", payload);
      return res.data;
    },
    onSuccess: () => {
      router.replace("/(auth)/signin");
    },
  });
}

export function useLogout() {
  const router = useRouter();

  return async () => {
    const refreshToken = authActions.getRefreshToken();
    if (refreshToken) {
      await api.post("/logout", { refreshToken }).catch(() => {});
    }
    await authActions.logout();
    router.replace("/(auth)/signin");
  };
}
