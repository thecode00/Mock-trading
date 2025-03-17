import { create } from "zustand";
import { useCryptoStore } from "./priceStore";
import { OrderData } from "../../types/order";

interface OrderStore {
  openPositions: OrderData[];
  orders: OrderData[];
  orderHistory: OrderData[];
  addOrder: (order: OrderData) => void;
  addOrderHistory: (order: OrderData) => void;
  checkOrderOpen: () => void;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  openPositions: [],
  orders: [],
  orderHistory: [],

  addOrder(order: OrderData) {
    set({ orders: [...get().orders, order] });
    get().addOrderHistory(order);
    console.log(get().openPositions, get().orders);
  },

  addOrderHistory(order: OrderData) {
    set({ orderHistory: [...get().orderHistory, order] });
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
          // 현재 가격보다 높게 사거나 낮게 포지션이 열릴경우 현재가격으로 수정
          item.price = price;
          set({ openPositions: [...get().openPositions, item] });
          get().addOrderHistory(item);
          return false;
        }

        return true;
      }),
    });
  },
}));
