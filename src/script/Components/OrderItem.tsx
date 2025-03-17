import { Box, Card, CardContent, Typography } from "@mui/material";

interface OrderData {
  type: string;
  price: number;
  amount: number;
  id: string;
}

interface OrderItemProps {
  data: OrderData;
}

export function OrderItem({ data }: OrderItemProps) {
  return (
    <Box>
      <Card>
        <CardContent>
          <Typography>{data.price}</Typography>
          <Typography>{data.type}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
