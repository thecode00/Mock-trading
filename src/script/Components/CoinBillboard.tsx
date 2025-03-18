import { useProfitStore } from "../store/profitStore";
import { Card, Typography } from "@mui/material";
import { useCryptoStore } from "../store/priceStore";
import PriceChart from "./PriceChart";

function CoinBillboard() {
  const { profit } = useProfitStore();
  const { tickerData, selectedTicker } = useCryptoStore();

  return (
    <Card sx={{ height: "100%", flexGrow: 1 }}>
      <Typography>
        {selectedTicker.toUpperCase()} Price:{" "}
        {tickerData ? parseFloat(tickerData.p) : 0}
      </Typography>
      <Typography>Total Profit: {profit}</Typography>
      <PriceChart />
    </Card>
  );
}

export default CoinBillboard;
