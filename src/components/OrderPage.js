import React, { useMemo } from "react";
import OrderGridTile from "./OrderGridTile";

export default React.memo(function OrderPage({ message, orderItems }) {
  console.log("Message", message);
  console.log("Order Items", orderItems);
  const sortedValue = useMemo(() => {
    console.log("inside use memo");
    return orderItems.sort((a, b) => {
      if (new Date(a.orderAt).getTime() < new Date(b.orderAt).getTime()) {
        return 1;
      } else {
        return -1;
      }
    });
  }, [orderItems]);

  console.log("Sorted value", sortedValue);
  
  return (
    <>
      {orderItems &&
        sortedValue.map((item) => (
          <OrderGridTile key={item.orderAt} {...item} />
        ))}
    </>
  );
});
