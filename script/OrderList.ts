export class OrderList {
	lists = [];
	constructor(type) {
		this.type = type;
	}

	moveOrderItem(id, nextList) {
		const idIndex = this.lists.findIndex((item) => item.id === id);
		console.log(id, nextList);
		nextList.lists.push(this.lists.splice(idIndex, 1));
		console.log(nextList.lists);
	}
}
