import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useNavigate } from "react-router-dom";

interface SigninPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  email: string;
  password: string;
  username: string;
  phone?: string;
}

export function useSignin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: SigninPayload) => {
      const res = await api.post<{ token: string; refreshToken: string }>("/signin", payload);
      return { token: res.data.token, refreshToken: res.data.refreshToken, email: payload.email };
    },
    onSuccess: async ({ token, refreshToken, email }) => {
      localStorage.setItem("jwt", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("email", email);

      const profile = await api.post(
        "/fetch-profile",
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.setItem("profile", JSON.stringify(profile.data.user));

      if (profile.data.user.super_admin) {
        navigate("/admin");
      } else {
        navigate("/chats");
      }
    },
  });
}

export function useSignup() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: SignupPayload) => {
      const res = await api.post("/signup", payload);
      return res.data;
    },
    onSuccess: () => {
      navigate("/login");
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();

  return async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      await api.post("/logout", { refreshToken }).catch(() => {});
    }
    localStorage.clear();
    navigate("/login");
  };
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem("jwt");
}
