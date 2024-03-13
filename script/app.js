import { OrderItem } from "./OrderItem.js";
import { OrderList } from "./OrderList.js";
import { PriceStorage } from "./PriceStorage.js";
import { BinanceSocket } from "./Utils/BinanceSocket.js";
const ORDER_OPEN = "order";
const ORDER_POSITION = "position";
// TODO: 각 부분 모듈화
class app {
    constructor() {
        this.changeTickerButton = document.getElementById("change-ticker-button");
        this.orderForm = document.getElementById("order-form");
        this.openOrderList = new OrderList("order");
        this.openPositionList = new OrderList("position");
        this.showTicker = "btc"; // 현재 보여지는 코인의 티커, 티커는 항상 소문자로 취급
        this.priceStorage = new PriceStorage(); // 코인들의 가격들을 저장하는 중앙 저장소
        this.changeTickerHandler = () => {
            const tickerElement = document.getElementById("change-ticker-input");
            this.showTicker = tickerElement.value.toLowerCase();
            if (this.showTicker.trim().length === 0) {
                return;
            }
            this.socket.changeOrderTicker(this.showTicker);
            this.p.textContent = this.showTicker.toUpperCase();
        };
        this.socket = new BinanceSocket(this.priceStorage);
        this.changeTickerButton.addEventListener("click", this.changeTickerHandler);
        this.p = document.getElementById("ticker-h1");
        this.orderForm.addEventListener("submit", this.addOrder.bind(this));
    }
    addOrder(event) {
        event.preventDefault();
        const targetPriceElement = this.orderForm.querySelector("#price-input");
        const targetPrice = parseFloat(targetPriceElement.value);
        const marginElement = this.orderForm.querySelector("#margin-input");
        const margin = parseFloat(marginElement.value);
        // TODO: 주문 상황별로 바꾸기
        const orderItem = new OrderItem(targetPrice, margin, this.showTicker, 1, ORDER_OPEN, this.priceStorage.getPrice(this.showTicker));
        this.openOrderList.lists.push(orderItem);
        this.priceStorage.subscribe(this.showTicker, orderItem);
    }
}
new app();
