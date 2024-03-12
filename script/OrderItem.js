const ORDER_OPEN = "order";
const ORDER_POSITION = "position";
export class OrderItem {
    constructor(orderPrice, margin, ticker, orderType, stage, curList, nextList, curPrice) {
        this.id = new Date().toString();
        this.test = (event) => {
            console.log(event);
            console.log(1, this.stage, ORDER_OPEN);
            if (this.stage === ORDER_OPEN) {
                console.log(2);
                this.curList.moveOrderItem(this.id, this.nextList);
            }
        };
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
    sell() { }
    cancel() { }
    render(parent) {
        console.log(1234);
        const orderItemTemplate = document.getElementById("order-item-template");
        const clone = document.importNode(orderItemTemplate.content, true);
        clone.querySelector("div").id = this.id;
        const templatePrice = clone.getElementById("t-order-price");
        templatePrice.innerText = this.orderPrice.toString();
        const templateAmount = clone.getElementById("t-order-amount");
        templateAmount.innerText = this.margin.toString();
        // TODO: 주문의 현재 상태별로 버튼 달라지게 하기
        const templateButton = clone.getElementById("t-order-button");
        // button의 visibility 속성을 설정하는 경우 타입 단언 또는 any 타입 사용
        templateButton.visibility = "none";
        templateButton.addEventListener("click", this.test);
        parent.append(clone);
    }
}
