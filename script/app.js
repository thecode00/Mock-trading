import { OrderItem } from "./OrderItem.js";
import { OrderList } from "./OrderList.js";
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
        this.changeTickerHandler = () => {
            const tickerElement = document.getElementById("change-ticker-input");
            const ticker = tickerElement.value;
            if (ticker.trim().length === 0) {
                return;
            }
            this.socket.changeOrderTicker(ticker);
            this.p.textContent = ticker.toUpperCase();
        };
        this.socket = new BinanceSocket();
        this.changeTickerButton.addEventListener("click", this.changeTickerHandler);
        this.p = document.getElementById("ticker-h1");
        this.orderForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const targetPriceElement = this.orderForm.querySelector("#price-input");
            const targetPrice = parseFloat(targetPriceElement.value);
            const marginElement = this.orderForm.querySelector("#margin-input");
            const margin = parseFloat(marginElement.value);
            console.log(targetPrice, margin);
            // 주문 상황별로 바꾸기
            this.openOrderList.lists.push(new OrderItem(targetPrice, margin, "BtC", 1, ORDER_OPEN, this.openOrderList, this.openPositionList));
        });
    }
}
new app();
