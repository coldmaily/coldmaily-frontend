// store/useMailStore.js
import { create } from "zustand";
import { getAllMails } from "@/libapi/mail";

export const useMailStore = create((set) => ({
  mailData: null,
  loading: false,
  fetchMails: async () => {
    set({ loading: true });
    try {
      const data = await getAllMails();
      set({ mailData: data });
    } catch (error) {
      console.error("Failed to fetch mails:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
