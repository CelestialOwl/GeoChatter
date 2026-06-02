import axios from "axios";

export const url = "https://server-1xg2.onrender.com";

const instance = axios.create({
  baseURL: url,
});

const jsonToken = localStorage.getItem("jwt");

instance.interceptors.request.use(
  async (config) => {
    if (jsonToken) {
      config.headers.Authorization = `Bearer ${jsonToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
