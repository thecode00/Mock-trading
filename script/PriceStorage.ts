import { OrderItem } from "./OrderItem";

// TODO: Add object type
export class PriceStorage {
	observers = {};
	tickerPrices = {};

	setPrice(ticker: string, price: number) {
		this.tickerPrices[ticker] = price;
	}

	getPrice(ticker: string) {
		return this.tickerPrices[ticker];
	}

	notify(ticker: string) {
		this.observers.map((item) => {
			item.curPrice = this.tickerPrices[item.ticker];
		});
	}

	subscribe(ticker: string, item: OrderItem) {
		if (!(ticker in this.observers)) {
			this.observers[ticker] = [];
		}
		this.observers[ticker].push(item);
		console.log(this.observers);
	}
}
