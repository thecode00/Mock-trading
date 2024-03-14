const ORDER_OPEN = "order";
const ORDER_POSITION = "position";
const openPositionList = document.getElementById("open-position-list");
// TODO: 클래스 컴포넌트로 만들기
export class OrderItem {
    constructor(orderPrice, margin, ticker, orderType, stage, curPrice) {
        this.id = new Date().getMilliseconds().toString();
        this.orderPrice = orderPrice;
        this.margin = margin;
        this.ticker = ticker;
        this.orderType = orderType;
        this.stage = stage;
        this.curPrice = curPrice;
        this.container = this.createContainer();
    }
    // TODO: 웹컴포넌트 변경용
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
        const tickerParagraph = document.createElement("p");
        tickerParagraph.textContent = this.ticker;
        const orderPriceParagraph = document.createElement("p");
        orderPriceParagraph.textContent = this.orderPrice.toString();
        const orderAmountParagraph = document.createElement("p");
        orderAmountParagraph.textContent = this.margin.toString();
        container.append(tickerParagraph, orderPriceParagraph, orderAmountParagraph);
        return container;
    }
    attach(parent) {
        parent.appendChild(this.container);
    }
    checkPrice() {
        if (this.stage === ORDER_OPEN) {
            if (this.curPrice <= this.orderPrice) {
                this.stage = ORDER_POSITION;
                console.log("Position open!");
                this.attach(openPositionList);
            }
        }
    }
    sell() { }
    cancel() { }
    render() {
        this.checkPrice();
        this.container.querySelector("p:last-child").textContent =
            this.curPrice.toString();
        if (this.stage === ORDER_POSITION) {
        }
    }
}
