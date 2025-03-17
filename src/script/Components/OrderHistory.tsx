import { List } from "@mui/material";
import { useOrderStore } from "../store/orderStore";
import { OrderItem } from "./OrderItem";

function OrderHistory() {
  const { orderHistory } = useOrderStore();

  return (
    <>
      <List>
        {orderHistory.map((order) => (
          <OrderItem key={order.id} data={order} />
        ))}
      </List>
    </>
  );
}

export default OrderHistory;
