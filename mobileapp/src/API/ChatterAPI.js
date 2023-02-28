import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const url = "https://a430-182-178-230-230.in.ngrok.io";

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
