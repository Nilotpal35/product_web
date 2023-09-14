import React from "react";
import { NavLink, redirect } from "react-router-dom";
import classes from "../styles/central.module.css";
import ProductGridTile from "./ProductGridTile";
export default React.memo(function ProductPage(props) {
  console.log("INSIDE PRODUCT PAGE", props);
  if (props.message) {
    return redirect("/login");
  }
  return (
    <div className={classes.main_div}>
      {/* <h2>Inside Product Page</h2> */}
      <div className={classes.container}>
        {props &&
          props?.products.map((item) => (
            <ProductGridTile key={item._id} {...item} />
          ))}
      </div>
      <div style={{ position: "absolute", bottom: "2rem" }}>
        {props &&
          props?.totalPages.map((item) => (
            <NavLink
              to={`/admin/product?page=${item}`}
              style={{
                backgroundColor: props?.page == item ? "purple" : "grey",
                color: props?.page == item ? "white" : "black",
                fontSize: "1rem",
                padding: "1rem",
              }}
            >
              {item}
            </NavLink>
          ))}
      </div>
    </div>
  );
});
