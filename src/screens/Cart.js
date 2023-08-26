import { json, redirect, useActionData, useLoaderData } from "react-router-dom";
import classes from "../styles/central.module.css";
import axios from "axios";
import CartGridTIle from "../components/CartGridTile";
import { greenSignals } from "../util/Signal";
import { useEffect, useState } from "react";
import Toaster from "../components/Toaster";

export default function Cart() {
  const [serverResponse, setServerResponse] = useState("");
  const actionData = useActionData();
  const { cartItems, allProducts } = useLoaderData();

  const cartsProdIds = cartItems?.cartItems?.map((item) => {
    return item.prodId;
  });

  const finalCartItems = allProducts.filter((item) =>
    cartsProdIds.includes(item._id)
  );

  const cartQty = cartItems.cartItems?.reduce((acc, curr) => {
    return (acc = acc + curr.qty);
  }, 0);

  const totalPrice = finalCartItems.reduce((acc, curr) => {
    return (acc =
      acc +
      curr.price *
        cartItems?.cartItems?.find((item) => item.prodId === curr._id).qty);
  }, 0);

  useEffect(() => {
    if (actionData?.message.length > 0) {
      setServerResponse(actionData?.message);
      setTimeout(() => {
        setServerResponse("");
      }, 3000);
    }
  }, [actionData]);

  return (
    <>
      {greenSignals.includes(actionData?.status) &&
        serverResponse.trim().length > 0 && (
          <Toaster message={actionData?.message} status={actionData?.status} />
        )}
      <div className={classes.main_div}>
        <div className={classes.cartHeader}>
          <p style={{ fontSize: "1rem", fontWeight: "600" }}>
            Total Items - {cartQty}
          </p>
          <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
            $ {totalPrice}
          </p>
        </div>
        <div className={classes.cartContainer}></div>
        {finalCartItems.length > 0 ? (
          finalCartItems.map((item) => (
            <CartGridTIle key={item._id} {...item} />
          ))
        ) : (
          <h2 className={classes.title}>No items left in your cart</h2>
        )}
      </div>
    </>
  );
}

export async function loader({ request, params }) {
  const userToken = localStorage.getItem("PU:TOKEN");
  if (!userToken) {
    return redirect("/login");
  }
  try {
    const URI = process.env.REACT_APP_BACKEND_URI + "cart";
    const response = await axios.get(URI, {
      headers: {
        "Content-Type": "applcation/json",
        userid: userToken,
      },
    });
    const URI2 = process.env.REACT_APP_BACKEND_URI + "products";
    const response2 = await axios.get(URI2);
    if (response.data) {
      return { cartItems: response.data, allProducts: response2?.data };
    } else {
      throw json("No cart fetched", {
        status: response.status,
        statusText: response.statusText,
      });
    }
  } catch (error) {
    throw json(error.message, {
      status: error.status,
      statusText: error.statusText,
    });
  }
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const prodId = formData.get("prodId");
  try {
    const URI = process.env.REACT_APP_BACKEND_URI + `delete-cart/${prodId}`;
    const response = await axios.delete(URI, {
      headers: {
        userid: localStorage.getItem("PU:TOKEN") || "",
      },
    });
    console.log("response in delete cart", response.data);
    return { message: response.data.message, status: response.status };
  } catch (error) {
    throw json(error.response.data.message, {
      status: error.response.status,
      statusText: error.response.statusText,
    });
  }
}
