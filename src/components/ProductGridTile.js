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
}) {
  const [showModal, setShowModal] = useState(false);

  const btnHandler = (e) => {
    setShowModal(!showModal);
  };

  const props = {
    btnHandler: btnHandler,
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
          <Link to="#" className={classes.button}>
            Add
          </Link>
          <button className={classes.button} onClick={btnHandler}>
            Details
          </button>
        </div>
      </div>
    </>
  );
}
