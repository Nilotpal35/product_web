import React from "react";
import { useMemo, useState } from "react";
import classes from "../styles/central.module.css";
import CartGridTIle from "./CartGridTile";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import Toaster from "./Toaster";

export default React.memo(function CartPage({ message, status, product }) {
  const [serverResponse, setServerResponse] = useState("");
  const [serverStatus, setServerStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  console.log("cart item page ", message, "-> ", status, "-> ", product);

  //evaluate total items in cart
  const cartQty = useMemo(
    () =>
      product?.reduce((curr, acc) => {
        return curr + +acc.qty;
      }, 0),
    [product]
  );

  // product &&
  // product?.reduce((curr, acc) => {
  //   return curr + +acc.qty;
  // }, 0);

  //evaluate total sum of items in cart
  const totalPrice = useMemo(
    () =>
      product?.reduce((curr, acc) => {
        return (curr += +(+acc.price * acc.qty));
      }, 0),
    [product]
  );

  // product &&
  // product?.reduce((curr, acc) => {
  //   return (curr += +(+acc.price * acc.qty));
  // }, 0);

  const orderHandler = async () => {
    setLoader(true);
    console.log("final cart items", product && product);
    try {
      const URI = process.env.REACT_APP_BACKEND_URI + `graphql`;
      const query = `
      mutation postOrder($prodId: postOrderForm!) {
          postOrder(input : $prodId) {
            message
          }
      }`;
      const graphqlMutation = {
        query,
        variables: {
          prodId: {
            product: product.length > 0 && product,
          },
        },
      };
      const response = await axios.post(URI, graphqlMutation, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
        },
      });
      console.log("response on post order", response.data);
      const { errors, data } = response.data;
      if (errors) {
        if (errors[0].message === "User not Authorized!") {
          return redirect("/login");
        }
        let errorMessage = "";
        errors.map((item) => {
          errorMessage += "-> " + item.message;
        });
        setServerResponse(errorMessage);
        setServerStatus(400);
      } else {
        setServerResponse(data.postOrder.message);
        setServerStatus(response.status);
        return setTimeout(() => {
          navigate("/admin/order");
        }, 2000);
      }
    } catch (error) {
      console.log("error while ordering item", error);
      // throw json(error?.response?.data?.message, { status: error?.response?.status });
      setServerResponse(error?.response?.data?.message + "" || "Backend Error");
      setServerStatus(error?.response?.status || 500);
    }
    setTimeout(() => {
      setServerResponse("");
      setLoader(false);
    }, 3000);
  };

  return (
    <>
      {serverResponse.length > 0 && (
        <Toaster message={serverResponse} status={serverStatus} />
      )}
      <div className={classes.main_div}>
        <div className={classes.cartHeader}>
          <p style={{ fontSize: "1rem", fontWeight: "600" }}>
            Total Items - {cartQty || 0}
          </p>
          <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
            $ {totalPrice || 0}
          </p>
        </div>
        {product && product?.length > 0 ? (
          product &&
          product.map((item) => <CartGridTIle key={item._id} {...item} />)
        ) : (
          <h2 className={classes.title}>No items left in your cart</h2>
        )}
        {product && product?.length > 0 && (
          <>
            <hr style={hrStyle} />
            <button
              style={loader ? loaderButtonStyle : buttonStyle}
              onClick={orderHandler}
              disabled={loader}
            >
              {loader ? "Ordering..." : "Order Now"}
            </button>
          </>
        )}
      </div>
    </>
  );
});

const buttonStyle = {
  padding: "1rem",
  backgroundColor: "rgb(200,100,150)",
  fontSize: "1rem",
  fontWeight: "600",
  borderStyle: "none",
};
const loaderButtonStyle = {
  padding: "1rem",
  backgroundColor: "grey",
  color: "black",
  fontSize: "1rem",
  fontWeight: "500",
  borderStyle: "none",
};

const hrStyle = {
  width: "90%",
  border: "1px solid black",
  borderRadius: "4px",
  margin: "1rem 0",
};
