import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  WidgetContext,
  createWidgetApi,
  createWidgetSocket,
  type WidgetConfig,
} from "./context";
import { ChatWidget } from "./ChatWidget";

interface WidgetProviderProps {
  config: WidgetConfig;
}

export function WidgetProvider({ config }: WidgetProviderProps) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
      }),
    []
  );

  const contextValue = useMemo(() => {
    const api = createWidgetApi(config);
    const socket = createWidgetSocket(config.apiUrl);
    return { ...config, api, socket };
  }, [config]);

  return (
    <QueryClientProvider client={queryClient}>
      <WidgetContext.Provider value={contextValue}>
        <ChatWidget />
      </WidgetContext.Provider>
    </QueryClientProvider>
  );
}
