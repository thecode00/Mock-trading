export class BinanceSocket {
	ws = new WebSocket(`wss://stream.binance.com:9443/ws/btcusdt@trade`);
	constructor(ticker) {
		this.ticker = ticker;
		console.log(
			`wss://stream.binance.com:9443/ws/${this.ticker}usdt@trade`
		);
		this.connect();
	}

	connect() {
		const p = document.getElementById("ticker-price");
		this.ws.close();
		this.ws = new WebSocket(
			`wss://stream.binance.com:9443/ws/${this.ticker}usdt@trade`
		);
		console.log(
			`wss://stream.binance.com:9443/ws/${this.ticker}usdt@trade`
		);
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
