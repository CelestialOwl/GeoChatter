import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const url = "https://b596-119-155-47-98.ngrok-free.app";

const instance = axios.create({
  baseURL: url,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
