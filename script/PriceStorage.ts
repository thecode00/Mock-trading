import { OrderItem } from "./OrderItem";

// TODO: Add object type
export class PriceStorage {
	observers: OrderItem[] = [];
	tickerPrices = {};

	setPrice(ticker: string, price: number) {
		this.tickerPrices[ticker] = price;
	}

	getPrice(ticker: string) {
		return this.tickerPrices[ticker];
	}

	notify() {
		this.observers.map((item) => {
			item.curPrice = this.tickerPrices[item.ticker];
		});
	}
}
