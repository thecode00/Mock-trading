import { List } from "@mui/material";
import { useOrderStore } from "../store/orderStore";
import { OrderItem } from "./OrderItem";
import { useRef } from "react";

function OrderHistory() {
  const id = useRef(new Set<string>());
  const { orderHistory } = useOrderStore();

  return (
    <>
      <List>
        {orderHistory.map((order) => {
          if (id.current.has(order.id)) {
            return false;
          }
          id.current.add(order.id);
          return <OrderItem key={order.id} data={order} />;
        })}
      </List>
    </>
  );
}

export default OrderHistory;
