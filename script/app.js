"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrderItem_js_1 = require("./OrderItem.js");
const OrderList_js_1 = require("./OrderList.js");
const BinanceSocket_js_1 = require("./Utils/BinanceSocket.js");
const ORDER_OPEN = "order";
const ORDER_POSITION = "position";
// TODO: app클래스로 만들기
const socket = new BinanceSocket_js_1.BinanceSocket("btc");
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
const openOrderList = new OrderList_js_1.OrderList("order");
const openPositionList = new OrderList_js_1.OrderList("position");
orderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const targetPrice = orderForm.querySelector("#price-input").value;
    const margin = orderForm.querySelector("#margin-input").value;
    console.log(targetPrice, margin);
    // 주문 상황별로 바꾸기
    openOrderList.lists.push(new OrderItem_js_1.OrderItem(targetPrice, margin, "BtC", 1, ORDER_OPEN, openOrderList, openPositionList));
});
