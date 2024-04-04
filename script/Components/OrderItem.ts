import { ProfitStorage } from "../Storage/ProfitStorage";
const ORDER_OPEN = "order";
const ORDER_POSITION = "position";
const orderPositionList = document.getElementById("open-position-list");

// TODO: 클래스 컴포넌트로 만들기

export class OrderItem extends HTMLElement {
  id = crypto.randomUUID();
  parent: HTMLElement; // container를 넣을 부모 요소
  orderPrice: number;
  margin: number;
  ticker: string;
  orderType: number; // 0 = Long, 1 = Short
  stage: string; // 주문의 현재 상태
  curPrice: number; // 티커의 현재 가격
  container: HTMLDivElement;

  constructor(
    parent: HTMLElement,
    orderPrice: number,
    margin: number,
    ticker: string,
    orderType: 0 | 1,
    stage: string,
    curPrice: number,
    private profitStorage: ProfitStorage
  ) {
    super();
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
    console.log("Element attach to DOM!");
    this.checkPrice();
    this.setAttribute("price", this.curPrice.toString());
    this.shadowRoot!.innerHTML = `
      <link href="bootstrap.min.css" rel="stylesheet"/>
      <div class="container">
        <p></p>
        <p id="order-price"></p>
        <p id="order-amount"></p>
        <button></button>
      </div>
    `;
    this.shadowRoot?.appendChild(this.container);
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

  static get observedAttributes() {
    return ["price"];
  }

  orderItemButtonHandler = () => {
    console.log("btn clickd", this.stage);
    if (this.stage === ORDER_POSITION) {
      this.profitStorage.recordProfit(
        this.margin *
          (1 +
            parseFloat(
              OrderItem.calcProfitRate(this.curPrice, this.orderPrice)
            )) -
          this.margin
      );
    }
    this._deleteFromDOM();
  };

  _deleteFromDOM() {
    this.remove();
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

      rowDiv.append(
        tickerParagraph,
        orderPriceParagraph,
        orderAmountParagraph,
        btn
      );
      container.append(rowDiv);
    } catch {
      console.log(1);
    }

    return container;
  }

  attach() {
    orderPositionList!.appendChild(this);
  }

  checkPrice() {
    if (this.stage === ORDER_OPEN) {
      // 주문이 체결된 경우
      if (this.curPrice <= this.orderPrice) {
        this.stage = ORDER_POSITION;
        console.log("Position open!");
        // 주문이 체결된후 ui변경
        this.orderPrice = this.curPrice;
        this.container.querySelector("#order-price")!.textContent =
          this.orderPrice.toString();
        this.container.querySelector("button")!.textContent = "Sell";
        // 요소 위치 변경
        this.parent = orderPositionList!;
        this.attach();
      }
    }
  }

  static calcProfitRate(curPrice: number, orderPrice: number) {
    return (((curPrice - orderPrice) / orderPrice) * 100).toFixed(2);
  }

  render() {
    if (this.stage === ORDER_POSITION) {
      this.container.querySelector("#order-amount")!.textContent =
        OrderItem.calcProfitRate(this.curPrice, this.orderPrice).toString();
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
