import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const url = "https://2669-182-178-229-135.in.ngrok.io";

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
