import React from "react";
import { Link, redirect, useLoaderData } from "react-router-dom";
import classes from "../styles/central.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
const Modal = React.lazy(() => import("./Modal"));

export default React.memo(function ProductGridTile({
  _id,
  title,
  price,
  imageUrl,
  description,
  serverResponse,
  setServerResponse,
  serverStatus,
  setServerStatus,
}) {
  console.log("INSIDE PRODUCT GRID TILE");
  const [showModal, setShowModal] = useState(false);

  const URI = process.env.REACT_APP_BACKEND_URI + "graphql";

  const query = `
      mutation postAddCart($input : postAddCartForm) {
        postAddCart(input : $input){
          message
          status
        }
      }
    `;
  const graphqlQuery = {
    query,
    variables: {
      input: {
        userId: localStorage.getItem("PU:TOKEN"),
        prodId: _id,
      },
    },
  };

  const addCartHandler = async () => {
    try {
      const response = await axios.post(URI, graphqlQuery, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
        },
      });
      console.log("RESPONSE IN ADD CART", response.data);
      const { errors, data } = response.data;
      if (errors) {
        if (errors[0].message === "User not Authorized!") {
          return redirect("/login");
        }
        console.log("ERRORS OBJECT IN RESPONSE", errors);
        let errorMessage = "";
        errors.map((item) => {
          errorMessage += "-> " + item.message;
        });
        setServerResponse(errorMessage);
        setServerStatus(400);
        //setServerResponse(err)
      } else if (data.postAddCart) {
        setServerResponse(data.postAddCart.message);
        setServerStatus(data.postAddCart.status);
      }
    } catch (error) {
      //this condition is only for checking is the jwt token got expired or not
      if (error?.response?.data?.errors[0].message === "User not Authorized!") {
        return redirect("/login");
      }
      setServerResponse(error?.response?.data?.message || "Some Axios Error");
      setServerStatus(error?.response?.status || 400);
      console.log("ERROR IN CATCH BLOCK ", error);
    }
  };
  // axios
  //   .post(
  //     URI,
  //     {},
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         userId: localStorage.getItem("PU:TOKEN"),
  //         itemId: _id,
  //         Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
  //       },
  //     }
  //   )
  //   .then((res) => {
  //     console.log("add cart response", res.data);
  //     if (res.data?.message) {
  //       setServerResponse(res.data?.message);
  //     }
  //   })
  //   .catch((err) => {
  //     console.log("error in axios add cart");
  //   });
  // };

  const btnHandler = (e) => {
    setShowModal(!showModal);
  };

  const props = {
    setShowModal: setShowModal,
    title: title,
    imageUrl: process.env.REACT_APP_BACKEND_URI + "image/" + imageUrl,
    _id: _id,
    price: price,
    description: description,
  };

  return (
    <>
      {showModal && <Modal {...props} />}
      <div className={classes.products}>
        <img
          src={process.env.REACT_APP_BACKEND_URI + "image/" + imageUrl}
          alt={title}
          className={classes.image}
        />
        <p className={classes.title}>{title}</p>
        <div className={classes.btnCtr}>
          <button className={classes.button} onClick={addCartHandler}>
            Add
          </button>
          <button className={classes.button} onClick={btnHandler}>
            Details
          </button>
        </div>
      </div>
    </>
  );
});
