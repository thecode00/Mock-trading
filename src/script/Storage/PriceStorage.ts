// import { OrderItem } from "../Components/OrderItem";

// interface observerInterface {
//   [key: string]: OrderItem[];
// }

// interface tickerPricesInterface {
//   [key: string]: number;
// }

// // TODO: Add object type
// export class PriceStorage {
//   observers: observerInterface = {};

//   tickerPrices: tickerPricesInterface = {};

//   /**
//    * 저장소에 코인의 가격을 저장하는 함수
//    * @param ticker 가격을 저장할 코인의 티커
//    * @param price 코인 가격
//    */
//   setPrice(ticker: string, price: number) {
//     this.tickerPrices[ticker] = price;
//     this.notify(ticker);
//   }

//   getPrice(ticker: string) {
//     return this.tickerPrices[ticker];
//   }

//   /**
//    * 코인의 가격이 변경되면 해당 코인의 가격을 구독하고있는 모든 OrderItem에게 알려주는 함수
//    * @param ticker   가격이 변경된 코인의 티커
//    */
//   notify(ticker: string) {
//     if (!(ticker in this.observers)) {
//       this.observers[ticker] = [];
//     }
//     this.observers[ticker].map((item) => {
//       item.setClassAttribute("price", this.tickerPrices[ticker]);
//     });
//   }

//   subscribe(ticker: string, item: OrderItem) {
//     if (!(ticker in this.observers)) {
//       this.observers[ticker] = [];
//     }
//     this.observers[ticker].push(item);
//   }
// }

// let tickers: string[] = [];
// let listeners: any = []; // TODO: 컴포넌트 타입 제한하기

// export const priceStore = {
//   addTicker(ticker: string) {
//     tickers = [...tickers, ticker];
//   },

//   subscribe(listener: any) {
//     listeners = [...listeners, listener];
//     return () => {
//       listeners = listeners.filter((l: any) => l !== listener);
//     };
//   },
//   getSnatshot() {
//     return tickers;
//   },
// };
