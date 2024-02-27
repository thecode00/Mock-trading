import { OrderItem } from "./OrderItem.js";
import { OrderList } from "./OrderList.js";
import { BinanceSocket } from "./Utils/BinanceSocket.js";

const socket = new BinanceSocket("btc");
const changeTickerButton = document.getElementById("change-ticker-button");

const orderForm = document.getElementById("order-form");

const changeTickerHandler = () => {
	const ticker = document.getElementById("change-ticker-input").value;
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

	const targetPrice = orderForm.querySelector("#price-input").value;
	const margin = orderForm.querySelector("#margin-input").value;
	console.log(targetPrice, margin);

	openOrderList.lists.push(new OrderItem(targetPrice, margin, "BtC", 1));
});
