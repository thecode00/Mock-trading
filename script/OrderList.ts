import { OrderItem } from "./OrderItem";

export class OrderList {
	lists: OrderItem[] = [];
	type: string;
	constructor(type: string) {
		this.type = type;
	}

	moveOrderItem(id: string, nextList: OrderList) {
		const idIndex = this.lists.findIndex((item) => item.id === id);
		console.log(id, nextList);
		nextList.lists.concat(this.lists.splice(idIndex, 1));
		console.log(nextList.lists);
	}
}
