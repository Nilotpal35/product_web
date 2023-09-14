import React from "react";
import classes from "../styles/central.module.css";

export default function OrderGridTile({ orderAt, items }) {
  const eachCart = ({ title, imageUrl }) => {
    return (
      <div className={classes.cartProducts}>
        <img
          className={classes.cartImage}
          src={process.env.REACT_APP_BACKEND_URI + "image/" + imageUrl}
          alt={title}
        />
        <p style={{ padding: "0 1rem" }}>{title}</p>
      </div>
    );
  };
  return (
    <div style={{ backgroundColor: "lightgrey", margin: "1rem 0" }}>
      <h2 style={{ color: "black" }}>
        {new Date(orderAt).toLocaleString("en-us", {
          formatMatcher: "best fit",
          dateStyle: "long",
          timeStyle: "short",
        })}
      </h2>
      {items && items?.map((item) => eachCart({ ...item }))}
    </div>
  );
}
