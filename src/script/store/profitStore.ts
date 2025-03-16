import { create } from "zustand";

interface ProfitStore {
  profit: number;
  addProfit: (openPrice: number, closePrice: number, amount: number) => void;
}

export const useProfitStore = create<ProfitStore>((set, get) => ({
  profit: 0,
  addProfit(openPrice, closePrice, amount) {
    set({ profit: get().profit + amount * (closePrice - openPrice) });
  },
}));
