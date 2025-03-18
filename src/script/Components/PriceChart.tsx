import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

const PriceChart: React.FC = () => {
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: 티커별 차트
    // Binance의 BTCUSDT 일별 Klines 데이터 요청 (1일 간격)
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d"
        );
        const json = await response.json();
        const formattedData = json.map((item: any) =>
          new Date(item[0]).toLocaleDateString()
        );
        const priceData = json.map((item: any) => parseFloat(item[4]));

        setXData(formattedData);
        setYData(priceData);
      } catch (error) {
        console.error("Error fetching Binance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Typography variant="h6" align="center" gutterBottom>
        BTCUSDT Daily Close Price
      </Typography>
      {xData.length > 0 ? (
        <LineChart
          xAxis={[{ data: xData }]}
          series={[{ data: yData }]}
          height={360}
          width={687}
        />
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default PriceChart;
