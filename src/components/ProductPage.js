import React, { useCallback, useState } from "react";
import { NavLink, redirect, useLocation, useNavigate } from "react-router-dom";
import classes from "../styles/central.module.css";
import ProductGridTile from "./ProductGridTile";
import Toaster from "./Toaster";
import { redSignals } from "../util/Signal";

export default React.memo(function ProductPage(props) {
  const [serverResponse, setServerResponse] = useState("");
  const [smessage, setMessage] = useState("");
  const [serverStatus, setServerStatus] = useState(null);
  const location = useLocation();
  const searchparams = new URLSearchParams(location.search);
  const page = searchparams.get("page");
  const navigate = useNavigate();

  const setToaster = useCallback(
    function ({ message, status }) {
      console.log("ARGS", message);
      setServerResponse(message);
      setServerStatus(status);
      setTimeout(() => {
        setServerResponse("");
        setServerStatus("");
      }, 2000);
    },
    [setServerResponse, setServerStatus]
  );

  if (
    props &&
    redSignals.includes(props.statusCode) &&
    props.statusCode === 401
  ) {
    // redirect the user to login page
    console.log("redirect to login");
    return navigate("/login");
  }

  return (
    <>
      {serverResponse.trim().length > 0 && (
        <Toaster message={serverResponse} status={serverStatus} />
      )}
      <div className={classes.main_div}>
        <div className={classes.container}>
          {props &&
            props?.products.map((item) => (
              <ProductGridTile
                key={item._id}
                {...item}
                setToaster={setToaster}
              />
            ))}
        </div>
        <div style={{ position: "fixed", bottom: "100px" }}>
          {props &&
            props?.totalPages.map((item) => (
              <NavLink
                to={`/admin/product?page=${item}`}
                style={{
                  backgroundColor: page == item ? "purple" : "grey",
                  color: page == item ? "white" : "black",
                  fontSize: "1rem",
                  padding: "1rem",
                }}
              >
                {item}
              </NavLink>
            ))}
        </div>
      </div>
    </>
  );
});
