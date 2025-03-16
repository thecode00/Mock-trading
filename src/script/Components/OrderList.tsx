import { OrderItem } from "./OrderItem";
import { useOrderStore } from "../store/orderStore";
import { List } from "@mui/material";

function OrderList() {
  const { orders } = useOrderStore();

  return (
    <>
      <List>
        {orders.map((order) => (
          <OrderItem key={order.id} data={order} />
        ))}
      </List>
    </>
  );
}

export default OrderList;
