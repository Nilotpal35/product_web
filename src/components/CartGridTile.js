import { useRef, useState } from "react";
import classes from "../styles/central.module.css";
import { Link, useLoaderData, useSubmit } from "react-router-dom";
import Modal from "./Modal";
import CustomIcon from "./CustomIcon";

export default function CartGridTIle({
  _id,
  title,
  imageUrl,
  price,
  description,
}) {
  const [showModal, setShowModal] = useState(false);
  const deleteRef = useRef();
  const submit = useSubmit();
  const { cartItems } = useLoaderData();
  const qty = cartItems?.cartItems?.find((i) => i.prodId === _id).qty;

  const btnHandler = (e) => {
    if (deleteRef.current && !deleteRef.current.contains(e.target)) {
      setShowModal(!showModal);
    }
  };

  const deleteCartHandler = (id) => {
    submit({ prodId: id }, { method: "DELETE" });
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
      <div className={classes.cartProducts} onClick={(e) => btnHandler(e)}>
        <img
          className={classes.cartImage}
          src={process.env.REACT_APP_BACKEND_URI + "image/" + imageUrl}
          alt={title}
        />
        <p>
          {title} X {qty}
        </p>
        <div style={{ margin: "0.5rem" }} ref={deleteRef}>
          <CustomIcon btnHandler={() => deleteCartHandler(_id)} />
        </div>
      </div>
    </>
  );
}
