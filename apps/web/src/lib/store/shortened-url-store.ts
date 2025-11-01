import { create } from "zustand";
import { ShortenedUrlStoreProps } from "./shortened-url-store.types";
import { persist } from "zustand/middleware";

export const useShortenedUrlStore = create<
  ShortenedUrlStoreProps,
  [["zustand/persist", ShortenedUrlStoreProps]]
>(
  persist(
    (set) => ({
      urls: [],
      addUrl: (newUrl) => set((state) => ({ urls: [newUrl, ...state.urls] })),
      removeUrl: (hash) => set((state) => ({
        urls: state.urls.filter((url) => url.hash !== hash),
      })),
    }),
    {
      name: "shortened-url-storage",
    }
  )
);
