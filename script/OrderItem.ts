import { OrderList } from "./OrderList";

const ORDER_OPEN = "order";
const ORDER_POSITION = "position";

export class OrderItem {
	id = new Date().toString();
	orderPrice: number;
	margin: number;
	ticker: string;
	orderType: number;
	stage: string;
	curList: OrderList;
	nextList: OrderList;
	curPrice: number;
	constructor(
		orderPrice: number,
		margin: number,
		ticker: string,
		orderType: 0 | 1,
		stage: string,
		curList: OrderList,
		nextList: OrderList,
		curPrice: number
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
		this.curPrice = curPrice;
		this.render(document.body);
	}

	sell() {}

	cancel() {}

	test = (event: MouseEvent) => {
		console.log(event);
		console.log(1, this.stage, ORDER_OPEN);
		if (this.stage === ORDER_OPEN) {
			console.log(2);
			this.curList.moveOrderItem(this.id, this.nextList);
		}
	};

	render(parent: HTMLElement) {
		console.log(1234);
		const orderItemTemplate: HTMLTemplateElement = document.getElementById(
			"order-item-template"
		) as HTMLTemplateElement;
		const clone: DocumentFragment = document.importNode(
			orderItemTemplate.content,
			true
		) as DocumentFragment;

		(clone.querySelector("div") as HTMLDivElement).id = this.id;
		const templatePrice = clone.getElementById(
			"t-order-price"
		) as HTMLParagraphElement;
		templatePrice.innerText = this.orderPrice.toString();

		const templateAmount = clone.getElementById(
			"t-order-amount"
		) as HTMLParagraphElement;
		templateAmount.innerText = this.margin.toString();

		// TODO: 주문의 현재 상태별로 버튼 달라지게 하기
		const templateButton = clone.getElementById(
			"t-order-button"
		) as HTMLButtonElement;
		// button의 visibility 속성을 설정하는 경우 타입 단언 또는 any 타입 사용
		(templateButton as any).visibility = "none";
		templateButton.addEventListener("click", this.test);

		parent.append(clone);
	}
}
