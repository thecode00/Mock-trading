import { OrderItem } from "./OrderItem.js";
import { OrderList } from "./OrderList.js";
import { PriceStorage } from "./PriceStorage.js";
import { BinanceSocket } from "./Utils/BinanceSocket.js";

const ORDER_OPEN = "order";
const ORDER_POSITION = "position";

// TODO: 각 부분 모듈화
class app {
	socket: BinanceSocket;
	changeTickerButton = document.getElementById(
		"change-ticker-button"
	) as HTMLButtonElement;
	p: HTMLParagraphElement;
	orderForm = document.getElementById("order-form") as HTMLFormElement;
	openOrderList = new OrderList("order");
	openPositionList = new OrderList("position");

	showTicker = "btc"; // 현재 보여지는 코인의 티커, 티커는 항상 소문자로 취급

	priceStorage = new PriceStorage(); // 코인들의 가격들을 저장하는 중앙 저장소

	constructor() {
		this.socket = new BinanceSocket(this.priceStorage);
		this.changeTickerButton.addEventListener(
			"click",
			this.changeTickerHandler
		);
		this.p = document.getElementById("ticker-h1") as HTMLParagraphElement;
		this.orderForm.addEventListener("submit", this.addOrder.bind(this));
	}

	changeTickerHandler = () => {
		const tickerElement = document.getElementById(
			"change-ticker-input"
		) as HTMLInputElement;
		this.showTicker = tickerElement!.value;
		if (this.showTicker.trim().length === 0) {
			return;
		}
		this.socket.changeOrderTicker(this.showTicker);
		this.p.textContent = this.showTicker.toUpperCase();
	};

	addOrder(event: SubmitEvent) {
		event.preventDefault();

		const targetPriceElement = this.orderForm.querySelector(
			"#price-input"
		) as HTMLInputElement;
		const targetPrice = parseFloat(targetPriceElement.value);

		const marginElement = this.orderForm.querySelector(
			"#margin-input"
		) as HTMLInputElement;
		const margin = parseFloat(marginElement.value);
		// 주문 상황별로 바꾸기
		this.openOrderList.lists.push(
			new OrderItem(
				targetPrice,
				margin,
				this.showTicker,
				1,
				ORDER_OPEN,
				this.openOrderList,
				this.openPositionList,
				this.priceStorage.getPrice(this.showTicker)
			)
		);
	}
}

new app();
