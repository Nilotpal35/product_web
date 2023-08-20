import { useRouteError, NavLink } from "react-router-dom";
import classes from "../styles/central.module.css";
import { styles } from "./MainNavigation";

export default function ErrorPage() {
  const error = useRouteError();
  console.log("error on JSON", error);
  return (
    <>
      <div className="App">
        <nav className="App-header">
          <li>
            <NavLink to={"/admin/product"} style={styles}>
              Product
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/cart"} style={styles}>
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/order"} style={styles}>
              Order
            </NavLink>
          </li>
        </nav>
      </div>
      <div className={classes.main_div_error}>
        <h2 style={{ ...textStyle, fontSize: "2rem" }}>Oops...</h2>
        {/* <div className={classes.error_main}> */}
        <div style={mainStyle}>
          <p style={textStyle}>{error.status}</p>
          <hr style={{ height: "30px" }} />
          <p style={textStyle}>
            {error?.data}
          </p>
        </div>
      </div>
      <footer className={classes.main_footer}>
        &copy; 2023 Nilotpal &reg; MIT License
      </footer>
    </>
  );
}
// {error?.data?.message}

const mainStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  backgroundColor: "red",
  borderRadius: "8px",
};

const textStyle = {
  fontSize: "1.5rem",
  margin: "10px",
  padding: "10px",
};
