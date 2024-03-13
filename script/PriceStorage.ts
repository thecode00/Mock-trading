import { OrderItem } from "./OrderItem";

interface observerInterface {
	[key: string]: OrderItem[];
}

interface tickerPricesInterface {
	[key: string]: number;
}

// TODO: Add object type
export class PriceStorage {
	observers: observerInterface = {};
	tickerPrices: tickerPricesInterface = {};

	setPrice(ticker: string, price: number) {
		this.tickerPrices[ticker] = price;
		this.notify(ticker);
	}

	getPrice(ticker: string) {
		return this.tickerPrices[ticker];
	}

	notify(ticker: string) {
		this.observers[ticker].map((item) => {
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
