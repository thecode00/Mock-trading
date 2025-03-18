import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid2,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useOrderStore } from "../store/orderStore";
import { v4 as uuidv4 } from "uuid";
import { OrderData } from "../../types/order";

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
          <Stack spacing={2}>
            <TextField
              id="amount-input"
              name="amount"
              label="Amount"
              variant="outlined"
              type="number"
              onChange={handleChange}
            />
            <TextField
              id="price-input"
              name="price"
              label="Price"
              variant="outlined"
              type="number"
              onChange={handleChange}
            />
            <Grid2 container direction={"row"} spacing={2}>
              <Grid2
                size={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
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
                      isOpen: false,
                    });
                  }}
                >
                  Buy/Long
                </Button>
              </Grid2>
              <Grid2
                size={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
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
                      isOpen: false,
                    });
                  }}
                >
                  Sell/Short
                </Button>
              </Grid2>
            </Grid2>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default OrderBlock;
