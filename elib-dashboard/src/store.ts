import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface TokenStore {
  token: string;
  setToken: (data: string) => void;
}

// export interface ThemeStore {
//   theme: "light" | "dark";
//   toggleTheme: () => void;
// }

export const useTokenStore = create<TokenStore>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        setToken: (data: string) => set(() => ({ token: data })),
      }),
      { name: "token-store" }
    )
  )
);

// export const useThemeStore = create<ThemeStore>()(
//   devtools(
//     persist(
//       (set, get) => ({
//         theme: localStorage.getItem("theme") === "dark" ? "dark" : "light", // Get theme from localStorage
//         toggleTheme: () => {
//           const newTheme = get().theme === "light" ? "dark" : "light";
//           localStorage.setItem("theme", newTheme); // Save to localStorage
//           set({ theme: newTheme });
//         },
//       }),
//       { name: "theme-store" }
//     )
//   )
// );

export default useTokenStore;
