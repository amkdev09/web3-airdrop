import axios from "axios";
import { store } from "../store/store";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/vault`,
  timeout: 2800000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (config.requiresAuth) {
      const address = store.getState()?.userAuth?.address;
      if (!address) {
        return Promise.reject(new Error("Wallet not connected"));
      }
      config.params = { ...config.params, address };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;

    if (status !== 401) {
      return Promise.reject(error?.response?.data ?? error);
    }
  }
);

export default api;
