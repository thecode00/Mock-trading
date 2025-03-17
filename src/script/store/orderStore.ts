import { create } from "zustand";
import { useCryptoStore } from "./priceStore";
import { OrderData } from "../../types/order";

interface OrderStore {
  openPositions: OrderData[];
  orders: OrderData[];
  addOrder: (order: OrderData) => void;
  checkOrderOpen: () => void;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  openPositions: [],
  orders: [],

  addOrder(order: OrderData) {
    set({ orders: [...get().orders, order] });
    console.log(get().openPositions, get().orders);
  },

  // order 중에 체결되는 order를 찾는 함수
  checkOrderOpen() {
    const tickerData = useCryptoStore.getState().tickerData;
    if (!tickerData) {
      return;
    }
    const price = parseFloat(tickerData.p);

    set({
      orders: get().orders.filter((item) => {
        if (
          (item.type === "long" && item.price >= price) ||
          (item.type === "short" && item.price <= price)
        ) {
          // 배열에 추가하는 방식으로 수정
          set({ openPositions: [...get().openPositions, item] });
          return false;
        }
        return true;
      }),
    });
  },
}));
