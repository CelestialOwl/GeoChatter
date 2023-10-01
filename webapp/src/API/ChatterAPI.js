import axios from "axios";

export const url = "http://localhost:3003";

const instance = axios.create({
  baseURL: url,
});

const jsonToken = localStorage.getItem("jwt");
console.log(jsonToken);

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
