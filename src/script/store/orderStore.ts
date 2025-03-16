import { create } from "zustand";
import { useCryptoStore } from "./priceStore";

interface OrderStore {
  openPositions: OrderData[];
  orders: OrderData[];
  addOrder: (order: OrderData) => void;
  checkOrderOpen: () => void;
}

interface OrderData {
  type: string;
  price: number;
  amount: number;
  id: string;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  openPositions: [{ type: "l", price: 0, amount: 0, id: "sdfsdfs'" }],
  orders: [],

  addOrder(order: OrderData) {
    set({ orders: [...get().orders, order] });
    console.log(get().openPositions, get().orders);
  },

  // order중에 체결되는 order를 찾는 함수
  checkOrderOpen() {
    const tickerData = useCryptoStore.getState().tickerData;
    set({
      orders: get().orders.filter((item) => {
        console.log(get().openPositions);
        if (
          (item.type === "long" && item.price >= tickerData.price) ||
          (item.type === "short" && item.price <= tickerData.price)
        ) {
          set({ openPositions: { ...get().openPositions, item } });
          return false;
        }
        return true;
      }),
    });
  },
}));
