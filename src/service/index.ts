import axios from "axios";
import { useTokenStore } from "@/stores/storeToken";

// Axios instance yaratamiz
export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// Request interceptor — accessToken’ni headerga qo‘shadi
api.interceptors.request.use((config) => {
  const { accessToken } = useTokenStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor — token yangilashni boshqaradi
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 bo‘lsa va hali qayta urinilmagan bo‘lsa
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refreshToken, setTokens, clearTokens } = useTokenStore.getState();

      if (refreshToken) {
        try {
          // Refresh token bilan yangi token olish
          const res = await axios.post(
            "http://localhost:3000/auth/refresh",
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          const newAccessToken = res.data.accessToken;
          const newRefreshToken = res.data.refreshToken;

          // Tokenlarni yangilash
          setTokens(newAccessToken, newRefreshToken);

          // Eski so‘rovni yangilangan token bilan qayta yuborish
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("❌ Refresh token ishlamadi:", refreshError);
          clearTokens();
          window.location.href = "/login";
        }
      } else {
        // Refresh token yo‘q bo‘lsa — tozalaymiz
        clearTokens();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
