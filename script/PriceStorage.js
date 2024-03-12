export class PriceStorage {
    constructor() {
        this.observers = [];
        this.tickerPrices = {};
    }
    setPrice(ticker, price) {
        this.tickerPrices[ticker] = price;
    }
    getPrice(ticker) {
        return this.tickerPrices[ticker];
    }
    notify() {
        this.observers.map((item) => {
            item.curPrice = this.tickerPrices[item.ticker];
        });
    }
}
