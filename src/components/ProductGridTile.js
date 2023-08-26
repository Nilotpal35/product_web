import { Link, useLoaderData } from "react-router-dom";
import classes from "../styles/central.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";

export default function ProductGridTile({
  _id,
  title,
  price,
  imageUrl,
  description,
  serverResponse,
  setServerResponse,
}) {
  const [showModal, setShowModal] = useState(false);

  const URI = process.env.REACT_APP_BACKEND_URI + "add-cart";

  const addCartHandler = () => {
    axios
      .post(
        URI,
        {},
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            userId: localStorage.getItem("PU:TOKEN"),
            itemId: _id,
          },
        }
      )
      .then((res) => {
        console.log("add cart response", res.data);
        if (res.data?.message) {
          setServerResponse(res.data?.message);
        }
      })
      .catch((err) => {
        console.log("error in axios add cart");
      });
  };

  const btnHandler = (e) => {
    setShowModal(!showModal);
  };

  const props = {
    setShowModal : setShowModal,
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
}
