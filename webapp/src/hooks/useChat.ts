import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Message, User, Community } from "@/types";

interface CreateRoomResponse {
  status: boolean;
  message: string;
  chatId: string;
  user: User;
}

interface PaginatedMessages {
  messages: Message[];
  total: number;
  page: number;
  hasMore: boolean;
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
      const res = await api.post<PaginatedMessages>("/fetch-messages", { roomId, page: 1, limit: 50 });
      return res.data.messages;
    },
    enabled: !!roomId,
    refetchInterval: false,
  });
}

export function useInfiniteMessages(roomId: string | null) {
  return useInfiniteQuery({
    queryKey: ["messages-infinite", roomId],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.post<PaginatedMessages>("/fetch-messages", {
        roomId,
        page: pageParam,
        limit: 50,
      });
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.page + 1 : undefined),
    enabled: !!roomId,
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
