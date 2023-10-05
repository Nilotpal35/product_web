import { useRouteError, NavLink } from "react-router-dom";
import classes from "../styles/central.module.css";
import { styles } from "./MainNavigation";

export default function ErrorPage({ text }) {
  const error = useRouteError();
  console.log("error on JSON", error?.data, error?.status);
  return (
    <>
      {/* <div className="App"> */}
      {/* {localStorage.getItem("PU:TOKEN") ? (
          <nav className="App-header">
            <li>
              <NavLink to={"/admin/product"} style={styles}>
                Add Product
              </NavLink>
            </li>
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
            {error?.data == "jwt expired" && (
              <li>
                <NavLink to={"/logout"} style={styles}>
                  Logout
                </NavLink>
              </li>
            )}
          </nav>
        ) : (
          <nav className="App-header">
            <li>
              <NavLink to={"/login"} style={styles}>
                login
              </NavLink>
            </li>
          </nav>
        )} */}
      {/* </div> */}
      <div className={classes.main_div_error}>
        <h2 style={{ ...textStyle, fontSize: "2rem" }}>Oops...</h2>
        {/* <div className={classes.error_main}> */}
        <div style={mainStyle}>
          <p style={textStyle}>{error?.status || text?.statusCode}</p>
          <hr style={{ height: "30px" }} />
          <p style={textStyle}>{error?.data || text?.message}</p>
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
