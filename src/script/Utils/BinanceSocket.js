export class BinanceSocket {
  constructor(storage = null) {
    this.ws = new WebSocket(`wss://stream.binance.com:9443/ws`);
    this.ticker = "btc";
    this.p = document.getElementById("ticker-price");
    this.storage = storage;
    this.init();
  }
  init() {
    const symbol = "btc";
    this.ws.onopen = () => {
      console.log("바이낸스 웹소켓에 연결되었습니다.");
      this.addTickerStream(symbol);
    };
    this.ws.onmessage = (msg) => {
      const json = JSON.parse(msg.data);
      //   if (json.s === `${this.ticker}usdt`.toUpperCase()) {
      //     this.p.innerText = parseFloat(json.p).toString();
      //   }
      console.log(json);
      // 티커의 마지막에 붙어있는 usdt제거
      //   this.storage.setPrice(
      //     json.s.slice(0, -4).toLowerCase(),
      //     parseFloat(json.p)
      //   );
    };
  }
  /**
   * 웹소켓으로 가격을 받아올 코인을 추가하는 함수
   * @param {string} ticker	웹소켓으로 가격을 받아올 코인의 티커
   */
  addTickerStream(ticker) {
    const subscribeMessage = JSON.stringify({
      method: "SUBSCRIBE",
      params: [`${ticker}usdt@trade`],
      id: 2,
    });
    this.ws.send(subscribeMessage);
    const Message = JSON.stringify({
      method: "LIST_SUBSCRIPTIONS",
      id: 2,
    });
    this.ws.send(Message);
  }
  /**
   * 쓰이지않는 티커의 웹소켓 구독을 취소하는 함수
   * @param ticker 웹소켓 구독을 제거할 티커
   */
  deleteTickerStream(ticker) {
    const unsubscribeMessage = JSON.stringify({
      method: "UNSUBSCRIBE",
      params: [`${ticker}usdt@trade`],
      id: 2,
    });
    this.ws.send(unsubscribeMessage);
  }
  changeOrderTicker(ticker) {
    this.ticker = ticker;
    this.addTickerStream(ticker);
  }
}
