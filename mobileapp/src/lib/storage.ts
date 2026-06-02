import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const KEYS = {
  TOKEN: "jwt",
  REFRESH_TOKEN: "refreshToken",
  EMAIL: "email",
  PROFILE: "profile",
} as const;

// Simple Zustand-like store for auth state that syncs with AsyncStorage
type AuthState = {
  token: string | null;
  email: string | null;
};

type Listener = () => void;

let state: AuthState = { token: null, email: null };
let refreshTokenCache: string | null = null;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((l) => l());
}

export const useAuthStore = <T>(selector: (s: AuthState) => T): T => {
  const [value, setValue] = useState(() => selector(state));

  useEffect(() => {
    const listener = () => setValue(selector(state));
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, [selector]);

  return value;
};

export const authActions = {
  async init() {
    const [token, email, rt] = await Promise.all([
      AsyncStorage.getItem(KEYS.TOKEN),
      AsyncStorage.getItem(KEYS.EMAIL),
      AsyncStorage.getItem(KEYS.REFRESH_TOKEN),
    ]);
    state = { token, email };
    refreshTokenCache = rt;
    notify();
  },

  async login(token: string, email: string, refreshToken?: string) {
    const ops = [
      AsyncStorage.setItem(KEYS.TOKEN, token),
      AsyncStorage.setItem(KEYS.EMAIL, email),
    ];
    if (refreshToken) ops.push(AsyncStorage.setItem(KEYS.REFRESH_TOKEN, refreshToken));
    await Promise.all(ops);
    state = { token, email };
    notify();
  },

  async logout() {
    await AsyncStorage.multiRemove([KEYS.TOKEN, KEYS.REFRESH_TOKEN, KEYS.EMAIL, KEYS.PROFILE]);
    state = { token: null, email: null };
    notify();
  },

  async updateTokens(token: string, refreshToken: string) {
    await Promise.all([
      AsyncStorage.setItem(KEYS.TOKEN, token),
      AsyncStorage.setItem(KEYS.REFRESH_TOKEN, refreshToken),
    ]);
    state = { ...state, token };
    notify();
  },

  getToken() {
    return state.token;
  },

  getRefreshToken(): string | null {
    // Sync read - we need to cache this at init time
    return refreshTokenCache;
  },

  getEmail() {
    return state.email;
  },
};

// Initialize on module load
authActions.init();
