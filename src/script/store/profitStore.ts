import { create } from "zustand";

interface ProfitStore {
  profit: number;
  addProfit: (openPrice: number, closePrice: number, amount: number) => void;
}

export const useProfitStore = create<ProfitStore>((set, get) => ({
  profit: 0,
  addProfit(openPrice, closePrice, amount) {
    console.log(get().profit + amount * (closePrice - openPrice));
    set({ profit: get().profit + amount * (closePrice - openPrice) });
  },
}));
