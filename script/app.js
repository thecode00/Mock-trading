import { OrderItem } from "./Components/OrderItem.js";
import { PriceStorage } from "./Storage/PriceStorage.js";
import { ProfitStorage } from "./Storage/ProfitStorage.js";
import { BinanceSocket } from "./Utils/BinanceSocket.js";
const ORDER_OPEN = "order";
const ORDER_POSITION = "position";
const openOrderList = document.getElementById("open-order-list");
const profitParagraph = document.getElementById("profit");
// TODO: 각 부분 모듈화
export class app {
    constructor() {
        this.changeTickerButton = document.getElementById("change-ticker-button");
        this.orderForm = document.getElementById("order-form");
        this.showTicker = "btc"; // 현재 보여지는 코인의 티커, 티커는 항상 소문자로 취급
        this.priceStorage = new PriceStorage(); // 코인들의 가격들을 저장하는 중앙 저장소
        this.profitStorage = new ProfitStorage();
        this.changeTickerHandler = () => {
            const tickerElement = document.getElementById("change-ticker-input");
            if (tickerElement.value.toLowerCase().trim().length === 0) {
                return;
            }
            this.showTicker = tickerElement.value.toLowerCase();
            this.socket.changeOrderTicker(this.showTicker);
            this.p.textContent = this.showTicker.toUpperCase();
        };
        this.socket = new BinanceSocket(this.priceStorage);
        this.changeTickerButton.addEventListener("click", this.changeTickerHandler);
        this.p = document.getElementById("ticker-h1");
        this.orderForm.addEventListener("submit", this.addOrder.bind(this));
        this.profitStorage.subscribe(this);
        this.updateProfit();
    }
    addOrder(event) {
        event.preventDefault();
        const targetPriceElement = this.orderForm.querySelector("#price-input");
        const targetPrice = parseFloat(targetPriceElement.value);
        const marginElement = this.orderForm.querySelector("#margin-input");
        const margin = parseFloat(marginElement.value);
        const orderItem = new OrderItem(openOrderList, targetPrice, margin, this.showTicker, 1, ORDER_OPEN, this.priceStorage.getPrice(this.showTicker), this.profitStorage);
        this.priceStorage.subscribe(this.showTicker, orderItem);
        openOrderList === null || openOrderList === void 0 ? void 0 : openOrderList.appendChild(orderItem);
    }
    updateProfit() {
        console.log("profit update");
        profitParagraph.textContent = `$${this.profitStorage
            .getProfit()
            .toFixed(2)
            .toString()}`;
    }
}
customElements.define("order-item", OrderItem);
new app();
