const ORDER_OPEN = "order";
const ORDER_POSITION = "position";
const orderPositionList = document.getElementById("open-position-list");

// TODO: 클래스 컴포넌트로 만들기

export class OrderItem {
	id = new Date().getMilliseconds().toString();
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
		curPrice: number
	) {
		this.parent = parent;
		this.orderPrice = orderPrice;
		this.margin = margin;
		this.ticker = ticker;
		this.orderType = orderType;
		this.stage = stage;
		this.curPrice = curPrice;
		this.container = this.createContainer();
	}

	orderItemButtonHandler = () => {
		console.log("btn clickd");
		if (this.stage === ORDER_POSITION) {
		}
		this._deleteFromDOM();
	};

	_deleteFromDOM() {
		this.parent.removeChild(this.container);
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
		orderAmountParagraph.id = "order-amount";

		const btn = document.createElement("button");
		btn.addEventListener("click", this.orderItemButtonHandler);
		btn.textContent = "Cancel";

		container.append(
			tickerParagraph,
			orderPriceParagraph,
			orderAmountParagraph,
			btn
		);
		return container;
	}

	attach() {
		this.parent.appendChild(this.container);
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
		this.checkPrice();
		if (this.stage === ORDER_POSITION) {
			this.container.querySelector("#order-amount")!.textContent =
				OrderItem.calcProfitRate(
					this.curPrice,
					this.orderPrice
				).toString();
		}
	}
}
