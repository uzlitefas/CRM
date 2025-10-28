// src/stores/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/service";

export const useAuth = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,

      // Kirish
      login: async (phone, password) => {
        set({ loading: true });
        try {
          const { data } = await api.post("/auth/login", { phone, password });
          localStorage.setItem("token", data.access_token);
          set({
            user: data.user,
            token: data.access_token,
          });
          return true;
        } catch (err) {
          console.error("Login error:", err);
          return false;
        } finally {
          set({ loading: false });
        }
      },

      // Foydalanuvchi ma’lumotlarini olish
      fetchUser: async () => {
        try {
          const { data } = await api.get("/auth/whoami");
          set({ user: data });
        } catch (err) {
          console.error("Fetch user error:", err);
          set({ user: null, token: null });
        }
      },

      // Chiqish
      logout: async () => {
        try {
          await api.post("/auth/logout");
        } catch (e) {
          console.warn("Logout error:", e);
        }
        localStorage.removeItem("token");
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);
