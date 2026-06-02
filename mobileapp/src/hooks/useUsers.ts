import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { authActions } from "@/lib/storage";
import type { User } from "@/types";

export function useProfile() {
  const email = authActions.getEmail();

  return useQuery({
    queryKey: ["profile", email],
    queryFn: async () => {
      const res = await api.post<{ user: User }>("/fetch-profile", { email });
      return res.data.user;
    },
    enabled: !!email,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUserList() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get<{ userList: User[] }>("/users-list");
      return res.data.userList;
    },
    staleTime: 30 * 1000,
  });
}
