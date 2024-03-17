// TODO: Add object type
export class PriceStorage {
    constructor() {
        this.observers = {};
        this.tickerPrices = {};
    }
    /**
     * 저장소에 코인의 가격을 저장하는 함수
     * @param ticker 가격을 저장할 코인의 티커
     * @param price 코인 가격
     */
    setPrice(ticker, price) {
        this.tickerPrices[ticker] = price;
        this.notify(ticker);
    }
    getPrice(ticker) {
        return this.tickerPrices[ticker];
    }
    /**
     * 코인의 가격이 변경되면 해당 코인의 가격을 구독하고있는 모든 OrderItem에게 알려주는 함수
     * @param ticker   가격이 변경된 코인의 티커
     */
    notify(ticker) {
        if (!(ticker in this.observers)) {
            this.observers[ticker] = [];
        }
        this.observers[ticker].map((item) => {
            item.curPrice = this.tickerPrices[item.ticker];
            item.render();
        });
    }
    subscribe(ticker, item) {
        if (!(ticker in this.observers)) {
            this.observers[ticker] = [];
        }
        this.observers[ticker].push(item);
    }
}
