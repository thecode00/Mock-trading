export class ProfitStorage {
    constructor() {
        this.profit = 0;
        try {
            const p = parseFloat(localStorage.getItem("profit"));
            this.profit = isNaN(p) ? 0 : p;
        }
        catch (_a) {
            this.profit = 0;
        }
    }
    recordProfit(profit) {
        this.profit += profit;
        localStorage.setItem("profit", this.profit.toString());
        console.log(`Profit recorded!: ${localStorage.getItem("profit")}`);
    }
}
