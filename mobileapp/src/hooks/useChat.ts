import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { authActions } from "@/lib/storage";
import type { Message, User, Community } from "@/types";

interface CreateRoomResponse {
  status: boolean;
  message: string;
  chatId: string;
  user: User;
}

export function useCreateRoom() {
  return useMutation({
    mutationFn: async (recipientId: string) => {
      const res = await api.post<CreateRoomResponse>("/create-room", {
        recipient: { _id: recipientId },
      });
      return res.data;
    },
  });
}

export function useMessages(roomId: string | null) {
  return useQuery({
    queryKey: ["messages", roomId],
    queryFn: async () => {
      const res = await api.post<Message[]>("/fetch-messages", { roomId });
      return res.data;
    },
    enabled: !!roomId,
    refetchInterval: false,
  });
}

export function useCommunities() {
  return useQuery({
    queryKey: ["communities"],
    queryFn: async () => {
      const res = await api.post<{ communities: Community[] }>("/get-community");
      return res.data.communities;
    },
    staleTime: 60 * 1000,
  });
}

export function useHobbies() {
  return useQuery({
    queryKey: ["hobbies"],
    queryFn: async () => {
      const email = authActions.getEmail();
      const res = await api.post<{ hobbies: string[] }>("/fetch-hobbies", { email });
      return res.data.hobbies;
    },
    staleTime: 5 * 60 * 1000,
  });
}
