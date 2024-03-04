"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinanceSocket = void 0;
class BinanceSocket {
    constructor(ticker) {
        this.ws = new WebSocket(`wss://stream.binance.com:9443/ws/btcusdt@trade`);
        this.ticker = ticker;
        console.log(`wss://stream.binance.com:9443/ws/${this.ticker}usdt@trade`);
        this.connect();
    }
    connect() {
        const p = document.getElementById("ticker-price");
        this.ws.close();
        this.ws = new WebSocket(`wss://stream.binance.com:9443/ws/${this.ticker}usdt@trade`);
        console.log(`wss://stream.binance.com:9443/ws/${this.ticker}usdt@trade`);
        this.ws.onmessage = (msg) => {
            const json = JSON.parse(msg.data);
            p.innerText = json.p;
        };
    }
    changeTicker(ticker) {
        this.ticker = ticker;
        this.connect();
    }
}
exports.BinanceSocket = BinanceSocket;
