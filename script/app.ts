import { OrderItem } from "./OrderItem.js";
import { OrderList } from "./OrderList.js";
import { BinanceSocket } from "./Utils/BinanceSocket.js";

const ORDER_OPEN = "order";
const ORDER_POSITION = "position";

// TODO: app클래스로 만들기
const socket = new BinanceSocket("btc");
const changeTickerButton = document.getElementById(
	"change-ticker-button"
) as HTMLButtonElement;

const orderForm = document.getElementById("order-form") as HTMLFormElement;

const changeTickerHandler = () => {
	const tickerElement = document.getElementById(
		"change-ticker-input"
	) as HTMLInputElement;
	const ticker = tickerElement!.value;
	if (ticker.trim().length === 0) {
		return;
	}

	socket.changeTicker(ticker.toLocaleLowerCase());
};
changeTickerButton.addEventListener("click", changeTickerHandler);

const openOrderList = new OrderList("order");
const openPositionList = new OrderList("position");

orderForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const targetPriceElement = orderForm.querySelector(
		"#price-input"
	) as HTMLInputElement;
	const targetPrice = parseFloat(targetPriceElement.value);

	const marginElement = orderForm.querySelector(
		"#margin-input"
	) as HTMLInputElement;
	const margin = parseFloat(marginElement.value);
	console.log(targetPrice, margin);
	// 주문 상황별로 바꾸기
	openOrderList.lists.push(
		new OrderItem(
			targetPrice,
			margin,
			"BtC",
			1,
			ORDER_OPEN,
			openOrderList,
			openPositionList
		)
	);
});
