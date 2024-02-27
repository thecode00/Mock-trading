export class OrderItem {
	id = new Date();
	constructor(orderPrice, margin, ticker, orderType, stage) {
		this.orderPrice = orderPrice;
		this.margin = margin;
		this.ticker = ticker;
		this.orderType = orderType; // 0 = Long, 1 = Short
		this.stage = stage; // 주문의 현재 상태
		this.render(document.body);
	}

	sell() {}

	cancel() {}

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

		parent.append(clone);
	}
}
