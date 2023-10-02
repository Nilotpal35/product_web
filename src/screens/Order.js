import { Await, defer, json, redirect, useLoaderData } from "react-router-dom";
import classes from "../styles/central.module.css";
import axios, { all } from "axios";
// import OrderGridTile from "../components/OrderGridTile";
import React, { useEffect } from "react";
import { SuspenceComponent } from "../App";
import OrderPage from "../components/OrderPage";
// import { onRenderCallBack } from "../util/onRenderCallback";
import { getAllOrders } from "../graphql/query";
import AsyncError from "../components/AsyncError";
// import { useEffect } from "react";

const OrderGridTile = React.lazy(() => import("../components/OrderGridTile"));

export default function Order() {
  //navigate the page into particular position
  // useEffect(() => {
  //   const targetElement = document.getElementById("bottom");
  //   targetElement.scrollIntoView({ behavior: "smooth" });
  // }, []);

  const loaderData = useLoaderData();

  return (
    <>
      <div className={classes.main_div}>
        {/* <h2 className={classes.title}>Order Page</h2> */}
        {SuspenceComponent(
          <Await resolve={loaderData.order} errorElement={<AsyncError />}>
            {(resolvedOrders) => <OrderPage {...resolvedOrders} />}
          </Await>
        )}
      </div>
      <div id="bottom"></div>
    </>
  );
}

export async function orderLoader({ request, params }) {
  const { errors, status, data, message } = await getAllOrders();

  if (status === 200) {
    return {
      message,
      orderItems: data.getAllOrders?.orderItems,
    };
  } else {
    throw new Error(message);
  }
}

export async function loader({ request, params }) {
  return defer({
    order: orderLoader({ request, params }),
  });
}
