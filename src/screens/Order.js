import { json, redirect, useLoaderData } from "react-router-dom";
import classes from "../styles/central.module.css";
import axios from "axios";
import OrderGridTile from "../components/OrderGridTile";

export default function Order() {
  const { message, orderItems } = useLoaderData();
  console.log("order loader data", message, orderItems);
  return (
    <>
      <div className={classes.main_div}>
        <h2 className={classes.title}>Order Page</h2>
        {orderItems?.map((item) => (
          <OrderGridTile key={item.orderAt} {...item} />
        ))}
      </div>
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
      },
    });
    console.log("RESPONSE IN ORDER", response?.data);
    return response?.data;
  } catch (error) {
    throw json(error.response.data.message, { status: error.response.status });
  }
}
