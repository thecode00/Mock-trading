import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { OrderData } from "../../types/order";
import { useProfitStore } from "../store/profitStore";
import { useCryptoStore } from "../store/priceStore";
import { useOrderStore } from "../store/orderStore";

interface OrderItemProps {
  data: OrderData;
}

export function OrderItem({ data }: OrderItemProps) {
  const { addProfit } = useProfitStore();
  const { closeOrder } = useOrderStore();
  const { tickerData } = useCryptoStore();
  return (
    <Box>
      <Card>
        <CardContent>
          <Typography>{data.price}</Typography>
          <Typography>{data.type}</Typography>
          {data.isOpen && (
            <Button
              variant="contained"
              color="error"
              sx={{ textTransform: "none" }}
              onClick={() => {
                addProfit(data.price, parseFloat(tickerData?.p), data.amount);
                closeOrder(data);
              }}
            >
              Close
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
