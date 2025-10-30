import axios from "axios";
import { useTokenStore } from "@/stores/storeToken";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refreshToken, setTokens, clearTokens } = useTokenStore.getState();
      if (refreshToken) {
        try {
          const res = await axios.post(
            "http://localhost:3000/auth/refresh",
            {},
            { headers: { Authorization: `Bearer ${refreshToken}` } }
          );

          setTokens(res.data.accessToken, res.data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return api(originalRequest);
          return api(originalRequest);
        } catch (err) {
          console.error("Refresh token ishlamadi:", err);
          clearTokens();
          window.location.href = "/login";
        }
      } else {
        clearTokens();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
