const ORDER_OPEN = "order";
const ORDER_POSITION = "position";
export class OrderItem {
    constructor(orderPrice, margin, ticker, orderType, stage, curPrice) {
        this.id = new Date().toString();
        this.orderPrice = orderPrice;
        this.margin = margin;
        this.ticker = ticker;
        this.orderType = orderType; // 0 = Long, 1 = Short
        this.stage = stage; // 주문의 현재 상태
        this.curPrice = curPrice;
        console.log(this);
        this.render(document.body);
    }
    createItemFromTemplate() {
        const orderItemTemplate = document.getElementById("order-item-template");
        const clone = document.importNode(orderItemTemplate.content, true);
        clone.querySelector("div").id = this.id;
        const curPriceParagraph = clone.getElementById("cur-price");
        curPriceParagraph.textContent = this.curPrice.toString();
        const templatePrice = clone.getElementById("t-order-price");
        templatePrice.innerText = this.orderPrice.toString();
        const templateAmount = clone.getElementById("t-order-amount");
        templateAmount.innerText = this.margin.toString();
        // TODO: 주문의 현재 상태별로 버튼 달라지게 하기
        const templateButton = clone.getElementById("t-order-button");
    }
    sell() { }
    cancel() { }
    render(parent) {
        console.log("OrderItem render");
        parent.append();
    }
}
