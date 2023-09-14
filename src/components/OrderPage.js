import React from "react";
const OrderGridTile = React.lazy(() => import("./OrderGridTile"));

export default React.memo(function OrderPage({ message, orderItems }) {
  console.log("Message", message);
  console.log("Order Items", orderItems);
  return (
    <>
      {/* <h2>Inside order page</h2> */}
      {orderItems &&
        orderItems.map((item) => (
          <OrderGridTile key={item.orderAt} {...item} />
        ))}
    </>
  );
});
