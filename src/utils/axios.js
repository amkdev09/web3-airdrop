import axios from "axios";
import Cookies from "js-cookie";
import { decryptData } from "./encryption";

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
      const storedAddress = Cookies.get("address");

      let address = null;
      if (storedAddress) {
        // Handle both legacy unencoded values and new encodeURIComponent values
        let cipherText = storedAddress;
        try {
          cipherText = decodeURIComponent(storedAddress);
        } catch {
          // If it's not URI-encoded, just use the raw value
          cipherText = storedAddress;
        }
        address = decryptData(cipherText);
        // Fallback: plain checksum address if decrypt failed (misconfigured key or legacy cookie)
        if (
          !address &&
          typeof cipherText === "string" &&
          /^0x[a-fA-F0-9]{40}$/.test(cipherText)
        ) {
          address = cipherText;
        }
      }
      const isRegistered = Cookies.get("isRegistered") === "true";
      const isPost = config.method?.toLowerCase() === "post";
      if (isPost && !isRegistered) {
        return window.location.href = "/connect-metamask?reason=required-registration";
      }
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
