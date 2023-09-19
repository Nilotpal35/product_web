import { Outlet, NavLink, useLoaderData } from "react-router-dom";
import "../App.css";
import classes from "../styles/central.module.css";

export default function MainNavigation() {
  const loaderData = useLoaderData();
  console.log("INSIDE MAIN NAVIGATION", loaderData);
  return (
    <>
      <div className="App">
        <nav className="App-header">
          <>
            <li>
              <NavLink to={"add-product"} style={styles}>
                Add Product
              </NavLink>
            </li>
            <li>
              <NavLink to={"product"} style={styles}>
                Product
              </NavLink>
            </li>
            <li>
              <NavLink to={"cart"} style={styles}>
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink to={"order"} style={styles}>
                Order
              </NavLink>
            </li>
            <li>
              <NavLink to={"/logout"} style={styles}>
                Logout
              </NavLink>
            </li>
          </>
          <div style={{ position: "absolute", right: "50px" }}>
            <li>
              <p>{loaderData?.name.toUpperCase()}</p>
            </li>
          </div>
        </nav>
        <section style={{ height: "82vh" }}>
          <Outlet />
        </section>
      </div>
      <footer className={classes.main_footer}>
        &copy; 2023 Nilotpal &reg; All Rights Reserved
      </footer>
    </>
  );
}

export const styles = ({ isActive, isPending }) => {
  return {
    fontWeight: isActive ? "bold" : "",
    color: isPending ? "white" : "black",
    backgroundColor: isActive ? "purple" : "grey",
    textDecoration: "none",
    padding: "1rem",
    margin: "1rem",
    borderRadius: "8px",
  };
};
