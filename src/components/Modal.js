import { useRef } from "react";
import Icons from "./Icons";
import classes from "../styles/central.module.css";
import { Link } from "react-router-dom";

export default function Modal({
  _id,
  title,
  price,
  description,
  imageUrl,
  btnHandler,
}) {
  const modalRef = useRef();

  const closeModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      btnHandler();
    }
  };

  return (
    <div style={modalStyle} onClick={closeModal}>
      <Icons btnHandler={btnHandler} />
      <div style={modalContent} ref={modalRef}>
        <img src={imageUrl} className={classes.dimage} alt={title} />
        <p style={text}> {title}</p>
        <p style={text}> ${price}</p>
        <p style={text}> {description}</p>
        <Link to={`/admin/edit-product?prodId=${_id}`}>Edit</Link>
      </div>
    </div>
  );
}

const modalStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  zIndex: "999",
  backgroundColor: "rgb(0,0,0,0.5)",
};

const modalContent = {
  backgroundColor: "rgb(256,256,256)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  //   height: "100%",
  maxHeight: "100%",
  width: "70%",
  borderRadius: "10px",
  overflow: "hidden",
  flexDirection: "column",
  overflowY: "auto",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
};

const text = {
  color: "grey",
  fontSize: "2rem",
};
