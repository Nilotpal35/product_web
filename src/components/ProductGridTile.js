import React from "react";
import classes from "../styles/central.module.css";
import { useState } from "react";
import { addCartItems } from "../graphql/mutation";
import Modal from "./Modal";
import { useRouteLoaderData } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default React.memo(function ProductGridTile({
  _id,
  title,
  price,
  imageUrl,
  description,
  setToaster,
}) {
  const authToken = useRouteLoaderData("root");
  const [showModal, setShowModal] = useState(false);

  const addCartHandler = async () => {
    const mutationData = {
      prodId: _id,
      authToken,
    };
    const { message, status } = await addCartItems(mutationData);
    if (message && status) {
      setToaster({ message, status });
    }
  };

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
      <AnimatePresence>{showModal && <Modal {...props} />}</AnimatePresence>
      <motion.div
        className={classes.products}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring" }}
      >
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
      </motion.div>
    </>
  );
});
