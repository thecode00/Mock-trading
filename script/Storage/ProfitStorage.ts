export class ProfitStorage {
  private profit = 0;
  constructor() {
    try {
      const p = parseFloat(localStorage.getItem("profit"));
      this.profit = isNaN(p) ? 0 : p;
    } catch {
      this.profit = 0;
    }
  }

  recordProfit(profit: number) {
    this.profit += profit;
    localStorage.setItem("profit", this.profit.toString());
    console.log(`Profit recorded!: ${localStorage.getItem("profit")}`);
  }
}
