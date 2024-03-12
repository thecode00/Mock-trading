// TODO: Add object type
export class PriceStorage {
    constructor() {
        this.observers = {};
        this.tickerPrices = {};
    }
    setPrice(ticker, price) {
        this.tickerPrices[ticker] = price;
    }
    getPrice(ticker) {
        return this.tickerPrices[ticker];
    }
    notify(ticker) {
        this.observers.map((item) => {
            item.curPrice = this.tickerPrices[item.ticker];
        });
    }
    subscribe(ticker, item) {
        if (!(ticker in this.observers)) {
            this.observers[ticker] = [];
        }
        this.observers[ticker].push(item);
        console.log(this.observers);
    }
}
