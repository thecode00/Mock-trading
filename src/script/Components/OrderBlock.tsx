import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid2,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useOrderStore } from "../store/orderStore";
import { v4 as uuidv4 } from "uuid";

interface OrderData {
  type: string;
  price: number;
  amount: number;
  id: string;
}

function OrderBlock() {
  const [amount, setAmount] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const { addOrder } = useOrderStore();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);
    if (name === "amount") {
      setAmount(isNaN(numericValue) ? 0 : numericValue);
    } else if (name === "price") {
      setPrice(isNaN(numericValue) ? 0 : numericValue);
    }
  }

  function handleOrder(order: OrderData) {
    if (isNaN(order.amount) || order.amount < 0) {
      console.log(1);
    }
    addOrder(order);
  }

  return (
    <Box>
      <Card sx={{ height: "100%", flexGrow: 1 }}>
        <CardHeader title="Order" />
        <CardContent>
          <Grid2 container sx={{}} spacing={2}>
            <Grid2>
              <TextField
                id="amount-input"
                name="amount"
                label="Amount"
                variant="outlined"
                type="number"
                onChange={handleChange}
              />
            </Grid2>
            <Grid2>
              <TextField
                id="price-input"
                name="price"
                label="Price"
                variant="outlined"
                type="number"
                onChange={handleChange}
              />
            </Grid2>
          </Grid2>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="success"
            sx={{ textTransform: "none" }}
            onClick={() => {
              handleOrder({
                type: "long",
                price,
                amount,
                id: uuidv4(),
              });
            }}
          >
            Buy/Long
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ textTransform: "none" }}
            onClick={() => {
              handleOrder({
                type: "short",
                price,
                amount,
                id: uuidv4(),
              });
            }}
          >
            Sell/Short
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default OrderBlock;
