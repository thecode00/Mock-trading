export class BinanceSocket {
	ws: WebSocket = new WebSocket(`wss://stream.binance.com:9443/ws`);
	ticker: string;
	constructor(ticker: string) {
		this.ticker = ticker;
		console.log(
			`wss://stream.binance.com:9443/ws/${this.ticker}usdt@trade`
		);
		this.connect();
		// this.send();
	}

	connect() {
		const p = document.getElementById("ticker-price");

		// this.ws.close();
		// this.ws = new WebSocket(
		// 	`wss://stream.binance.com:9443/ws/${this.ticker}usdt@trade`
		// );
		// console.log(
		// 	`wss://stream.binance.com:9443/ws/${this.ticker}usdt@trade`
		// );
		const symbol = "btcusdt";
		this.ws.onopen = () => {
			console.log("바이낸스 웹소켓에 연결되었습니다.");

			// 심볼의 티커 데이터를 구독
			const subscribeMessage = JSON.stringify({
				method: "SUBSCRIBE",
				params: [`${symbol}@ticker`],
				id: 1,
			});
			this.ws.send(subscribeMessage);
		};
		this.ws.onmessage = (msg) => {
			console.log(msg);
			const json = JSON.parse(msg.data);
			p!.innerText = json.p;
		};
	}

	changeTicker(ticker: string) {
		this.ticker = ticker;
		this.connect();
	}
}
