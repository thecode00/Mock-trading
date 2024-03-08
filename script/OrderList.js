"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderList = void 0;
class OrderList {
    constructor(type) {
        this.lists = [];
        this.type = type;
    }
    moveOrderItem(id, nextList) {
        const idIndex = this.lists.findIndex((item) => item.id === id);
        console.log(id, nextList);
        nextList.lists.concat(this.lists.splice(idIndex, 1));
        console.log(nextList.lists);
    }
}
exports.OrderList = OrderList;
