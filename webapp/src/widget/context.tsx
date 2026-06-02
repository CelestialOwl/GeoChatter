import { createContext, useContext } from "react";
import axios, { type AxiosInstance } from "axios";
import { io, type Socket } from "socket.io-client";

export interface WidgetConfig {
  token: string;
  apiUrl: string;
  email: string;
  theme?: "light" | "dark";
  onAuthError?: () => void;
}

interface WidgetContextValue extends WidgetConfig {
  api: AxiosInstance;
  socket: Socket;
}

const WidgetContext = createContext<WidgetContextValue | null>(null);

export function useWidgetContext() {
  const ctx = useContext(WidgetContext);
  if (!ctx) throw new Error("useWidgetContext must be inside WidgetProvider");
  return ctx;
}

export function createWidgetApi(config: WidgetConfig): AxiosInstance {
  const instance = axios.create({ baseURL: config.apiUrl });

  instance.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${config.token}`;
    return req;
  });

  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status === 401) {
        config.onAuthError?.();
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

export function createWidgetSocket(apiUrl: string): Socket {
  return io(apiUrl);
}

export { WidgetContext };
