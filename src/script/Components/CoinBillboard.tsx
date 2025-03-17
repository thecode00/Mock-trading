import React from "react";
import { useProfitStore } from "../store/profitStore";
import { Card, Typography } from "@mui/material";
import { useCryptoStore } from "../store/priceStore";
import { LineChart } from "@mui/x-charts";

function CoinBillboard() {
  const { profit } = useProfitStore();
  const { tickerData, selectedTicker } = useCryptoStore();

  return (
    <Card sx={{ height: "100%", flexGrow: 1 }}>
      <Typography>
        {selectedTicker.toUpperCase()} Price: {tickerData ? tickerData.p : 0}
      </Typography>
      <Typography>Total Profit: {profit}</Typography>
    </Card>
    // TODO: 코인 차트 넣기
  );
}

export default CoinBillboard;
