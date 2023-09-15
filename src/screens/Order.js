import { Await, defer, json, redirect, useLoaderData } from "react-router-dom";
import classes from "../styles/central.module.css";
import axios, { all } from "axios";
// import OrderGridTile from "../components/OrderGridTile";
import React, { useEffect } from "react";
import { SuspenceComponent } from "../App";
import OrderPage from "../components/OrderPage";
import { onRenderCallBack } from "../util/onRenderCallback";
// import { useEffect } from "react";

const OrderGridTile = React.lazy(() => import("../components/OrderGridTile"));

export default function Order() {
  //navigate the page into particular position
  // useEffect(() => {
  //   const targetElement = document.getElementById("bottom");
  //   targetElement.scrollIntoView({ behavior: "smooth" });
  // }, []);

  const loaderData = useLoaderData();

  // const allPr = await Promise.allSettled([loaderData.order]);

  // const finalData = allPr.map((item) => item.value);

  // console.log("promise", finalData[0].message , finalData[0].orderItems );

  // orderItems?.sort((a, b) => {
  //   return new Date(b.orderAt).getTime() > new Date(a.orderAt).getTime()
  //     ? 1
  //     : -1;
  // });

  return (
    <>
      <div className={classes.main_div}>
        {/* <h2 className={classes.title}>Order Page</h2> */}
        {SuspenceComponent(
          <Await resolve={loaderData.order}>
            {(resolvedOrders) => <OrderPage {...resolvedOrders} />}
            {/* {(resolvedItems) => {
              resolvedItems.orderItems.sort((a, b) => {
                return new Date(b.orderAt).getTime() >
                  new Date(a.orderAt).getTime()
                  ? 1
                  : -1;
              });
              return resolvedItems.orderItems?.map((item) => (
                <OrderGridTile key={item.orderAt} {...item} />
              ));
            }} */}
          </Await>
        )}
        {/* {orderItems?.map((item) => (
          <OrderGridTile key={item.orderAt} {...item} />
        ))} */}
      </div>
      <div id="bottom"></div>
    </>
  );
}

export async function orderLoader({ request, params }) {
  try {
    const URI = process.env.REACT_APP_BACKEND_URI + "graphql";

    //graphQL implementation
    const query = `
      query getAllOrders($page : Int) {
        getAllOrders(page : $page) {
          message
          orderItems{
            orderAt 
            items {
              _id 
              title
              imageUrl
            }
          }
        }
      }
    `;
    const graphqlQuery = {
      query,
      variables: {
        page: 1,
      },
    };

    const response = await axios.post(URI, graphqlQuery, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
      },
    });

    //REST APIs
    // const response = await axios.get(URI, {
    //   headers: {
    //     userid: userToken,
    //     Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
    //   },
    // });
    console.log("RESPONSE IN ORDER", response.data);
    const { errors, data } = response.data;
    return {
      message: data.getAllOrders?.message,
      orderItems: data.getAllOrders?.orderItems,
    };
  } catch (error) {
    throw json(error.response.data.message, { status: error.response.status });
  }
}

export async function loader({ request, params }) {
  return defer({
    order: orderLoader({ request, params }),
  });
}
