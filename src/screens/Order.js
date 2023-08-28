import { json, redirect, useLoaderData } from "react-router-dom";
import classes from "../styles/central.module.css";
import axios from "axios";
import OrderGridTile from "../components/OrderGridTile";
import { useEffect } from "react";
// import { useEffect } from "react";

export default function Order() {
  //navigate the page into particular position
  // useEffect(() => {
  //   const targetElement = document.getElementById("bottom");
  //   targetElement.scrollIntoView({ behavior: "smooth" });
  // }, []);

  const { message, orderItems } = useLoaderData();

  orderItems?.sort((a, b) => {
    return new Date(b.orderAt).getTime() > new Date(a.orderAt).getTime()
      ? 1
      : -1;
  });

  return (
    <>
      <div className={classes.main_div}>
        <h2 className={classes.title}>Order Page</h2>
        {orderItems?.map((item) => (
          <OrderGridTile key={item.orderAt} {...item} />
        ))}
      </div>
      <div id="bottom"></div>
    </>
  );
}

export async function loader({ request, params }) {
  const userToken = localStorage.getItem("PU:TOKEN");
  if (!userToken) {
    return redirect("/login");
  }
  const URI = process.env.REACT_APP_BACKEND_URI + "get-order";
  try {
    const response = await axios.get(URI, {
      headers: {
        userid: userToken,
        Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
      },
    });
    console.log("RESPONSE IN ORDER", response?.data);
    return response?.data;
  } catch (error) {
    throw json(error.response.data.message, { status: error.response.status });
  }
}
