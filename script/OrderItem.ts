const ORDER_OPEN = "order";
const ORDER_POSITION = "position";

export class OrderItem {
	id = new Date();
	constructor(
		orderPrice,
		margin,
		ticker,
		orderType,
		stage,
		curList,
		nextList
	) {
		this.orderPrice = orderPrice;
		this.margin = margin;
		this.ticker = ticker;
		this.orderType = orderType; // 0 = Long, 1 = Short
		this.stage = stage; // 주문의 현재 상태
		// 테스트용
		this.curList = curList;
		console.log(stage);
		this.nextList = nextList;
		this.render(document.body);
	}

	sell() {}

	cancel() {}

	test = (event) => {
		console.log(event);
		console.log(1, this.stage, ORDER_OPEN);
		if (this.stage === ORDER_OPEN) {
			console.log(2);
			this.curList.moveOrderItem(this.id, this.nextList);
		}
	};

	render(parent) {
		const orderItemTemplate = document.getElementById(
			"order-item-template"
		);
		const clone = document.importNode(orderItemTemplate.content, true);
		clone.querySelector("div").id = this.id;
		const templatePrice = clone.getElementById("t-order-price");
		templatePrice.innerText = this.orderPrice;

		const templateAmount = clone.getElementById("t-order-amount");
		templateAmount.innerText = this.margin;

		// TODO: 주문의 현재 상태별로 버튼 달라지게 하기
		const templateButton = clone.getElementById("t-order-button");
		templateButton.visibility = "none";
		templateButton.addEventListener("click", this.test);

		parent.append(clone);
	}
}
