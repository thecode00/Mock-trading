import { OrderItem } from "./OrderItem.js";
import { OrderList } from "./OrderList.js";
import { BinanceSocket } from "./Utils/BinanceSocket.js";

const ORDER_OPEN = "order";
const ORDER_POSITION = "position";

// TODO: app클래스로 만들기
class app {
	socket: BinanceSocket;
	changeTickerButton = document.getElementById(
		"change-ticker-button"
	) as HTMLButtonElement;
	p: HTMLParagraphElement;
	orderForm = document.getElementById("order-form") as HTMLFormElement;
	openOrderList = new OrderList("order");
	openPositionList = new OrderList("position");

	constructor() {
		this.socket = new BinanceSocket();
		this.changeTickerButton.addEventListener(
			"click",
			this.changeTickerHandler
		);
		this.p = document.getElementById("ticker-h1") as HTMLParagraphElement;
		this.orderForm.addEventListener("submit", (event) => {
			event.preventDefault();

			const targetPriceElement = this.orderForm.querySelector(
				"#price-input"
			) as HTMLInputElement;
			const targetPrice = parseFloat(targetPriceElement.value);

			const marginElement = this.orderForm.querySelector(
				"#margin-input"
			) as HTMLInputElement;
			const margin = parseFloat(marginElement.value);
			console.log(targetPrice, margin);
			// 주문 상황별로 바꾸기
			this.openOrderList.lists.push(
				new OrderItem(
					targetPrice,
					margin,
					"BtC",
					1,
					ORDER_OPEN,
					this.openOrderList,
					this.openPositionList
				)
			);
		});
	}

	changeTickerHandler = () => {
		const tickerElement = document.getElementById(
			"change-ticker-input"
		) as HTMLInputElement;
		const ticker = tickerElement!.value;
		if (ticker.trim().length === 0) {
			return;
		}
		this.socket.changeOrderTicker(ticker);
		this.p.textContent = ticker.toUpperCase();
	};
}

new app();
