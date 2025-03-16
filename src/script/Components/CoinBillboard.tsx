import React from "react";
import { useProfitStore } from "../store/profitStore";
import { Box, Typography } from "@mui/material";
import { useCryptoStore } from "../store/priceStore";
import { LineChart } from "@mui/x-charts";

function CoinBillboard() {
  const { profit } = useProfitStore();
  const { tickerData, selectedTicker, setTicker } = useCryptoStore();
  return (
    <Box width={100}>
      <Typography>
        {selectedTicker.toUpperCase()} Price: {tickerData.p}
      </Typography>
      <Typography>Total Profit: {profit}</Typography>
    </Box>
  );
}

export default CoinBillboard;
