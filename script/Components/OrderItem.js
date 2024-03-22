const ORDER_OPEN = "order";
const ORDER_POSITION = "position";
const orderPositionList = document.getElementById("open-position-list");
// TODO: 클래스 컴포넌트로 만들기
export class OrderItem extends HTMLElement {
    constructor(parent, orderPrice, margin, ticker, orderType, stage, curPrice, profitStorage) {
        super();
        this.profitStorage = profitStorage;
        this.id = new Date().getMilliseconds().toString();
        this.orderItemButtonHandler = () => {
            console.log("btn clickd", this.stage);
            if (this.stage === ORDER_POSITION) {
                this.profitStorage.recordProfit(this.margin *
                    (1 +
                        parseFloat(OrderItem.calcProfitRate(this.curPrice, this.orderPrice))) -
                    this.margin);
            }
            this._deleteFromDOM();
        };
        this.parent = parent;
        this.orderPrice = orderPrice;
        this.margin = margin;
        this.ticker = ticker;
        this.orderType = orderType;
        this.stage = stage;
        this.curPrice = curPrice;
        this.container = this.createContainer();
        this.attachShadow({ mode: "open" });
        this.render();
    }
    // 요소가 DOM에 추가되었을떄 실행되는 함수
    connectedCallback() {
        var _a;
        console.log("Element attach to DOM!");
        this.checkPrice();
        this.setAttribute("price", this.curPrice.toString());
        this.shadowRoot.innerHTML = `
      <div class="container">
        <p></p>
        <p id="order-price"></p>
        <p id="order-amount"></p>
        <button></button>
      </div>
    `;
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(this.container);
    }
    // 요소가 DOM에서 제거될때 실행되는 함수
    disconnectedCallback() {
        console.log("Disconnected from DOM!");
    }
    // 속성이 변경되었을때 실행되는 함수
    attributeChangedCallback(name, oldValue, newValue) {
        // 값이 같을경우 성능을 위해 작업 방지
        if (oldValue === newValue) {
            return;
        }
        switch (name) {
            case "price":
                this.curPrice = newValue;
                break;
        }
        this.render();
    }
    static get observedAttributes() {
        return ["price"];
    }
    _deleteFromDOM() {
        // this.parent.removeChild(this.container);
    }
    createContainer() {
        const container = document.createElement("div");
        container.classList.add("row");
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        try {
            const tickerParagraph = document.createElement("p");
            tickerParagraph.textContent = this.ticker;
            const orderPriceParagraph = document.createElement("p");
            orderPriceParagraph.textContent = this.orderPrice.toString();
            orderPriceParagraph.id = "order-price";
            const orderAmountParagraph = document.createElement("p");
            orderAmountParagraph.textContent = this.margin.toString();
            orderAmountParagraph.id = "order-amount";
            const btn = document.createElement("button");
            btn.addEventListener("click", this.orderItemButtonHandler);
            btn.classList.add("btn", "btn-primary");
            btn.textContent = "Cancel";
            rowDiv.append(tickerParagraph, orderPriceParagraph, orderAmountParagraph, btn);
            container.append(rowDiv);
        }
        catch (_a) {
            console.log(1);
        }
        return container;
    }
    attach() {
        orderPositionList.appendChild(this);
    }
    checkPrice() {
        if (this.stage === ORDER_OPEN) {
            // 주문이 체결된 경우
            if (this.curPrice <= this.orderPrice) {
                this.stage = ORDER_POSITION;
                console.log("Position open!");
                // 주문이 체결된후 ui변경
                this.orderPrice = this.curPrice;
                this.container.querySelector("#order-price").textContent =
                    this.orderPrice.toString();
                this.container.querySelector("button").textContent = "Sell";
                // 요소 위치 변경
                this.parent = orderPositionList;
                this.attach();
            }
        }
    }
    static calcProfitRate(curPrice, orderPrice) {
        return (((curPrice - orderPrice) / orderPrice) * 100).toFixed(2);
    }
    render() {
        if (this.stage === ORDER_POSITION) {
            this.container.querySelector("#order-amount").textContent =
                OrderItem.calcProfitRate(this.curPrice, this.orderPrice).toString();
        }
    }
    /**
     * 클래스의 속성을 변경하는 함수
     * @param name 속성 이름
     * @param value 속성 값
     */
    setClassAttribute(name, value) {
        this.setAttribute(name, value);
    }
}
