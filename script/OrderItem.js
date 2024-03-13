const ORDER_OPEN = "order";
const ORDER_POSITION = "position";
// TODO: 클래스 컴포넌트로 만들기
export class OrderItem {
    constructor(orderPrice, margin, ticker, orderType, stage, curPrice) {
        this.id = new Date().toString();
        this.orderPrice = orderPrice;
        this.margin = margin;
        this.ticker = ticker;
        this.orderType = orderType; // 0 = Long, 1 = Short
        this.stage = stage; // 주문의 현재 상태
        this.curPrice = curPrice;
        this.container = this.createContainer();
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
    createContainer() {
        const container = document.createElement("div");
        const currentPriceParagraph = document.createElement("p");
        currentPriceParagraph.textContent = this.curPrice.toString();
        const orderPriceParagraph = document.createElement("p");
        orderPriceParagraph.textContent = this.orderPrice.toString();
        const orderAmountParagraph = document.createElement("p");
        orderAmountParagraph.textContent = this.margin.toString();
        container.append(currentPriceParagraph, orderPriceParagraph, orderAmountParagraph);
        return container;
    }
    sell() { }
    cancel() { }
    render(parent) {
        console.log("OrderItem rendered");
        console.log(this.curPrice);
        parent.append(this.container);
    }
}
