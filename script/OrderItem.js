const ORDER_OPEN = "order";
const ORDER_POSITION = "position";
const openPositionList = document.getElementById("open-position-list");
// TODO: 클래스 컴포넌트로 만들기
export class OrderItem {
    constructor(orderPrice, margin, ticker, orderType, stage, curPrice) {
        this.id = new Date().getMilliseconds().toString();
        this.orderItemButtonHandler = () => {
            console.log("btn clickd");
            if (this.stage === ORDER_POSITION) {
            }
            this._deleteFromDOM();
        };
        this.orderPrice = orderPrice;
        this.margin = margin;
        this.ticker = ticker;
        this.orderType = orderType;
        this.stage = stage;
        this.curPrice = curPrice;
        this.container = this.createContainer();
    }
    _deleteFromDOM() {
        var _a;
        (_a = this.container.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(this.container);
    }
    createContainer() {
        const container = document.createElement("div");
        const orderStageParagraph = document.createElement("p");
        orderStageParagraph.textContent = this.stage;
        const tickerParagraph = document.createElement("p");
        tickerParagraph.textContent = this.ticker;
        const orderPriceParagraph = document.createElement("p");
        orderPriceParagraph.textContent = this.orderPrice.toString();
        orderPriceParagraph.id = "order-price";
        const orderAmountParagraph = document.createElement("p");
        orderAmountParagraph.textContent = this.margin.toString();
        const btn = document.createElement("button");
        btn.addEventListener("click", this.orderItemButtonHandler);
        btn.textContent = "124";
        container.append(tickerParagraph, orderPriceParagraph, orderAmountParagraph, btn);
        return container;
    }
    attach(parent) {
        parent.appendChild(this.container);
    }
    checkPrice() {
        if (this.stage === ORDER_OPEN) {
            // 주문이 체결된 경우
            if (this.curPrice <= this.orderPrice) {
                this.stage = ORDER_POSITION;
                console.log("Position open!");
                this.orderPrice = this.curPrice;
                this.container.querySelector("#order-price").textContent =
                    this.orderPrice.toString();
                this.attach(openPositionList);
            }
        }
    }
    static calcProfitRate(curPrice, orderPrice) {
        return (((curPrice - orderPrice) / orderPrice) * 100).toFixed(2);
    }
    render() {
        this.checkPrice();
        if (this.stage === ORDER_POSITION) {
            this.container.querySelector("p:last-child").textContent =
                OrderItem.calcProfitRate(this.curPrice, this.orderPrice).toString();
        }
    }
}
