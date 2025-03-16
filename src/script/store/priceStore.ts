import { create } from "zustand";

const BASE_URL = "wss://stream.binance.com:9443/ws";

interface CryptoStore {
  selectedTicker: string;
  tickerData: MessageEvent | null;
  setTicker: (newTicker: string) => void;
  connectWebsocket: () => void;
  disconnectWebsocket: () => void;
}

export const useCryptoStore = create<CryptoStore>((set, get) => {
  let socket: WebSocket | null = null;

  const connectWebsocket = () => {
    // 기존 소켓이 있다면 먼저 종료
    if (socket) {
      get().disconnectWebsocket();
    }
    socket = new WebSocket(BASE_URL);
    socket.onopen = () => {
      socket?.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: [`${get().selectedTicker}usdt@trade`],
          id: 2,
        })
      );
    };
    socket.onmessage = (msg) => {
      set({ tickerData: msg });
      console.log(msg);
    };
  };

  const disconnectWebsocket = () => {
    if (socket) {
      socket = null;
    }
  };

  return {
    selectedTicker: "btc",
    tickerData: null,
    setTicker(newTicker: string) {
      if (newTicker === get().selectedTicker) {
        return;
      }
      set({ selectedTicker: newTicker });
      connectWebsocket();
    },
    connectWebsocket,
    disconnectWebsocket,
  };
});
