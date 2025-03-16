import { useOrderStore } from "../store/orderStore";
import { OrderItem } from "./OrderItem";

function OpenPositionList() {
  const { openPositions } = useOrderStore();
  return (
    <div>
      {openPositions.map((item) => (
        <OrderItem key={item.id} data={item} />
      ))}
    </div>
  );
}

export default OpenPositionList;
