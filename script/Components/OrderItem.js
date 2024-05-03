const ORDER_OPEN = "order";
const ORDER_POSITION = "position";
const orderPositionList = document.getElementById("open-position-list");
// TODO: 클래스 컴포넌트로 만들기
export class OrderItem extends HTMLElement {
    static get observedAttributes() {
        return ["price"];
    }
    constructor(parent, orderPrice, amount, ticker, orderType, stage, curPrice, profitStorage) {
        super();
        this.profitStorage = profitStorage;
        this.id = crypto.randomUUID();
        this.orderItemButtonHandler = () => {
            console.log("orderItem btn clickd", this.stage);
            if (this.stage === ORDER_POSITION) {
                this.profitStorage.recordProfit(this.amount *
                    (1 +
                        parseFloat(OrderItem.calcProfitRate(this.curPrice, this.orderPrice))) -
                    this.amount);
            }
            this._deleteFromDOM();
        };
        this.parent = parent;
        this.orderPrice = orderPrice;
        this.amount = amount;
        this.ticker = ticker;
        this.orderType = orderType;
        this.stage = stage;
        this.curPrice = curPrice;
        this.createContainer();
        this.render();
    }
    // 요소가 DOM에 추가되었을떄 실행되는 함수
    connectedCallback() {
        console.log("Element attach to DOM!");
        this.checkPrice();
        this.setAttribute("price", this.curPrice.toString());
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
    _deleteFromDOM() {
        this.remove();
    }
    createContainer() {
        var _a;
        this.innerHTML = `
    <div class="card ">
      <div class="card-body">
          <h5 class="card-title">${this.ticker.toUpperCase()} / ${this.orderType ? "Sell" : "Buy"}</h5>
          <p class="card-text">${new Date(Date.now()).toUTCString()}
          </div>
      <div id="orderInfo" >
          <p id="order-price" class="card-text">OrderPrice: ${this.orderPrice}</p>
          <p id="order-amount" class="card-text">Amount(usdt): ${this.amount}</p>
      </div>
      <button class="btn btn-primary w-25">Cancel</button>
    </div>
    `;
        console.log(this.querySelector("button"));
        (_a = this.querySelector("button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.orderItemButtonHandler);
    }
    attach(target) {
        target.appendChild(this);
    }
    checkPrice() {
        var _a;
        if (this.stage === ORDER_OPEN) {
            // 주문이 체결된 경우
            if (this.curPrice <= this.orderPrice) {
                console.log("Position open!");
                // 주문이 체결된후 ui변경
                const orderInfoDiv = this.querySelector("orderInfo");
                this.stage = ORDER_POSITION;
                this.orderPrice = this.curPrice;
                this.querySelector("#order-price").textContent = `EntryPrice: ${this.orderPrice}`;
                this.querySelector("button").textContent = "Sell";
                const profitParagraph = document.createElement("p");
                profitParagraph.id = "profit";
                (_a = this.querySelector("#orderInfo")) === null || _a === void 0 ? void 0 : _a.append(profitParagraph);
                // 요소 위치 변경
                this.parent = orderPositionList;
                this.attach(this.parent);
                this.render();
            }
        }
    }
    static calcProfitRate(curPrice, orderPrice) {
        return (((curPrice - orderPrice) / orderPrice) * 100).toFixed(2);
    }
    render() {
        if (this.stage === ORDER_POSITION) {
            this.querySelector("#profit").textContent = `Profit: ${this.curPrice}(${OrderItem.calcProfitRate(this.curPrice, this.orderPrice).toString()}%)`;
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
