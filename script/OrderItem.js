export class OrderItem {
	constructor(orderPrice, margin, ticker, orderType, stage) {
		this.orderPrice = orderPrice;
		this.margin = margin;
		this.ticker = ticker;
		this.orderType = orderType; // 0 = Long, 1 = Short
		this.stage = stage;
		this.render(document.body);
	}

	sell() {}

	render(parent) {
		const orderItemTemplate = document.getElementById(
			"order-item-template"
		);
		const clone = document.importNode(orderItemTemplate.content, true);
		const templatePrice = clone.getElementById("t-order-price");
		templatePrice.innerText = this.orderPrice;

		const templateAmount = clone.getElementById("t-order-amount");
		templateAmount.innerText = this.margin;

		const templateButton = clone.getElementById("t-order-button");
		templateButton.visibility = "none";

		parent.append(clone);
	}
}
