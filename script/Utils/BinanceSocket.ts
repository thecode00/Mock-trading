import { PriceStorage } from "../PriceStorage";

export class BinanceSocket {
	ws: WebSocket = new WebSocket(`wss://stream.binance.com:9443/ws`);
	p: HTMLParagraphElement;
	ticker = "btc";
	storage: PriceStorage;
	constructor(storage: PriceStorage) {
		this.p = document.getElementById(
			"ticker-price"
		) as HTMLParagraphElement;
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
			console.log(json);
			if (json.s === `${this.ticker}usdt`.toUpperCase()) {
				this.p!.innerText = json.p;
			}
			this.storage.setPrice(json.s.slice(0, 3), json.p);
			console.log(this.storage.tickerPrices);
		};
	}

	addTickerStream(ticker: string) {
		const subscribeMessage = JSON.stringify({
			method: "SUBSCRIBE",
			params: [`${ticker}usdt@trade`],
			id: 2,
		});
		this.ws!.send(subscribeMessage);
		const Message = JSON.stringify({
			method: "LIST_SUBSCRIPTIONS",
			id: 2,
		});
		this.ws.send(Message);
	}

	deleteTickerStream(ticker: string) {
		const unsubscribeMessage = JSON.stringify({
			method: "UNSUBSCRIBE",
			params: [`${ticker}usdt@trade`],
			id: 2,
		});
		this.ws!.send(unsubscribeMessage);
	}

	changeOrderTicker(ticker: string) {
		this.ticker = ticker;
		this.addTickerStream(ticker);
	}
}
