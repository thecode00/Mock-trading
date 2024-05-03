import { ProfitStorage } from "../Storage/ProfitStorage";
const ORDER_OPEN = "order";
const ORDER_POSITION = "position";
const orderPositionList = document.getElementById("open-position-list");

// TODO: 클래스 컴포넌트로 만들기

export class OrderItem extends HTMLElement {
  id = crypto.randomUUID();
  parent: HTMLElement; // container를 넣을 부모 요소
  orderPrice: number;
  amount: number;
  ticker: string;
  orderType: number; // 0 = Long, 1 = Short
  stage: string; // 주문의 현재 상태
  curPrice: number; // 티커의 현재 가격

  static get observedAttributes() {
    return ["price"];
  }

  constructor(
    parent: HTMLElement,
    orderPrice: number,
    amount: number,
    ticker: string,
    orderType: 0 | 1,
    stage: string,
    curPrice: number,
    private profitStorage: ProfitStorage
  ) {
    super();
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
  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
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

  orderItemButtonHandler = () => {
    console.log("orderItem btn clickd", this.stage);
    if (this.stage === ORDER_POSITION) {
      this.profitStorage.recordProfit(
        this.amount *
          (1 +
            parseFloat(
              OrderItem.calcProfitRate(this.curPrice, this.orderPrice)
            )) -
          this.amount
      );
    }
    this._deleteFromDOM();
  };

  _deleteFromDOM() {
    this.remove();
  }

  createContainer() {
    this.innerHTML = `
    <div class="card ">
      <div class="card-body">
          <h5 class="card-title">${this.ticker.toUpperCase()} / ${
      this.orderType ? "Sell" : "Buy"
    }</h5>
          <p class="card-text">${new Date(Date.now()).toUTCString()}
          </div>
      <div id="orderInfo" >
          <p id="order-price" class="card-text">OrderPrice: ${
            this.orderPrice
          }</p>
          <p id="order-amount" class="card-text">Amount(usdt): ${
            this.amount
          }</p>
      </div>
      <button class="btn btn-primary w-25">Cancel</button>
    </div>
    `;
    console.log(this.querySelector("button"));
    this.querySelector("button")?.addEventListener(
      "click",
      this.orderItemButtonHandler
    );
  }

  attach(target: HTMLElement) {
    target.appendChild(this);
  }

  checkPrice() {
    if (this.stage === ORDER_OPEN) {
      // 주문이 체결된 경우
      if (this.curPrice <= this.orderPrice) {
        console.log("Position open!");
        // 주문이 체결된후 ui변경
        const orderInfoDiv = this.querySelector("orderInfo");
        this.stage = ORDER_POSITION;
        this.orderPrice = this.curPrice;
        this.querySelector(
          "#order-price"
        )!.textContent = `EntryPrice: ${this.orderPrice}`;
        this.querySelector("button")!.textContent = "Sell";

        const profitParagraph = document.createElement("p");
        profitParagraph.id = "profit";
        this.querySelector("#orderInfo")?.append(profitParagraph);
        // 요소 위치 변경
        this.parent = orderPositionList!;
        this.attach(this.parent);
        this.render();
      }
    }
  }

  static calcProfitRate(curPrice: number, orderPrice: number) {
    return (((curPrice - orderPrice) / orderPrice) * 100).toFixed(2);
  }

  render() {
    if (this.stage === ORDER_POSITION) {
      this.querySelector("#profit")!.textContent = `Profit: ${
        this.curPrice
      }(${OrderItem.calcProfitRate(
        this.curPrice,
        this.orderPrice
      ).toString()}%)`;
    }
  }

  /**
   * 클래스의 속성을 변경하는 함수
   * @param name 속성 이름
   * @param value 속성 값
   */
  setClassAttribute(name: string, value: any) {
    this.setAttribute(name, value);
  }
}
