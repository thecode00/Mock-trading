const ORDER_OPEN = "order";
const ORDER_POSITION = "position";
const openPositionList = document.getElementById("open-position-list");

// TODO: 클래스 컴포넌트로 만들기

export class OrderItem {
	id = new Date().getMilliseconds().toString();
	orderPrice: number;
	margin: number;
	ticker: string;
	orderType: number; // 0 = Long, 1 = Short
	stage: string; // 주문의 현재 상태
	curPrice: number; // 티커의 현재 가격
	container: HTMLDivElement;

	constructor(
		orderPrice: number,
		margin: number,
		ticker: string,
		orderType: 0 | 1,
		stage: string,
		curPrice: number
	) {
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
		this.container.parentElement?.removeChild(this.container);
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

		container.append(
			tickerParagraph,
			orderPriceParagraph,
			orderAmountParagraph,
			btn
		);
		return container;
	}

	attach(parent: HTMLElement) {
		parent.appendChild(this.container);
	}

	checkPrice() {
		if (this.stage === ORDER_OPEN) {
			// 주문이 체결된 경우
			if (this.curPrice <= this.orderPrice) {
				this.stage = ORDER_POSITION;
				console.log("Position open!");
				this.orderPrice = this.curPrice;
				this.container.querySelector("#order-price")!.textContent =
					this.orderPrice.toString();
				this.attach(openPositionList!);
			}
		}
	}

	static calcProfitRate(curPrice: number, orderPrice: number) {
		return (((curPrice - orderPrice) / orderPrice) * 100).toFixed(2);
	}

	render() {
		this.checkPrice();
		if (this.stage === ORDER_POSITION) {
			this.container.querySelector("p:last-child")!.textContent =
				OrderItem.calcProfitRate(
					this.curPrice,
					this.orderPrice
				).toString();
		}
	}
}
