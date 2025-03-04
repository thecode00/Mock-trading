import { create } from "zustand";
const BASE_URL = "wss://stream.binance.com:9443/ws";

// 바이낸스 웹 소켓 api와 통신, 가져온 데이터를 상태로 저장하는 store
export const useCryptoStore = create((set, get) => {
  const socket = new WebSocket(BASE_URL);

  return {
    selectedTicker: "btc",
    tickerData: null,

    setTicker(newTicker: string) {
      if (newTicker === get().selectedTicker) {
        return;
      }

      set({ selectedTicker: newTicker });
      get().connectWebsocket();
    },

    connectWebsocket() {
      if (!socket) {
        return;
      }
      // 소켓이 연결돼있지 않은경우 send시 오류가 나기 때문에 onopen에서 send 처리
      if (!(socket.readyState !== WebSocket.OPEN)) {
        socket.onopen = () => {
          socket.send(
            JSON.stringify({
              method: "SUBSCRIBE",
              params: [`${get().selectedTicker}usdt@trade`],
              id: 2,
            })
          );
        };
      } else {
        socket.send(
          JSON.stringify({
            method: "SUBSCRIBE",
            params: [`${get().selectedTicker}usdt@trade`],
            id: 2,
          })
        );
      }
    },
  };
});
