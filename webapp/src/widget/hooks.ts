import { useMutation, useQuery } from "@tanstack/react-query";
import { useWidgetContext } from "./context";
import type { Message, User, Community } from "@/types";

interface CreateRoomResponse {
  status: boolean;
  message: string;
  chatId: string;
  user: User;
}

export function useWidgetProfile() {
  const { api, email } = useWidgetContext();

  return useQuery({
    queryKey: ["widget-profile", email],
    queryFn: async () => {
      const res = await api.post<{ user: User }>("/fetch-profile", { email });
      return res.data.user;
    },
    enabled: !!email,
    staleTime: 5 * 60 * 1000,
  });
}

export function useWidgetUserList() {
  const { api } = useWidgetContext();

  return useQuery({
    queryKey: ["widget-users"],
    queryFn: async () => {
      const res = await api.get<{ userList: User[] }>("/users-list");
      return res.data.userList;
    },
    staleTime: 30 * 1000,
  });
}

export function useWidgetCreateRoom() {
  const { api } = useWidgetContext();

  return useMutation({
    mutationFn: async (recipientId: string) => {
      const res = await api.post<CreateRoomResponse>("/create-room", {
        recipient: { _id: recipientId },
      });
      return res.data;
    },
  });
}

export function useWidgetMessages(roomId: string | null) {
  const { api } = useWidgetContext();

  return useQuery({
    queryKey: ["widget-messages", roomId],
    queryFn: async () => {
      const res = await api.post<Message[]>("/fetch-messages", { roomId });
      return res.data;
    },
    enabled: !!roomId,
    refetchInterval: false,
  });
}

export function useWidgetCommunities() {
  const { api } = useWidgetContext();

  return useQuery({
    queryKey: ["widget-communities"],
    queryFn: async () => {
      const res = await api.post<{ communities: Community[] }>("/get-community");
      return res.data.communities;
    },
    staleTime: 60 * 1000,
  });
}
