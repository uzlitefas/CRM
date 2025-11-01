import { create } from "zustand";

interface TokenState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
}

export const useTokenStore = create<TokenState>((set) => ({
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),

  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    set({ accessToken, refreshToken });
  },

  clearTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ accessToken: null, refreshToken: null });
  },
}));
