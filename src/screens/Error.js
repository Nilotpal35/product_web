import { useRouteError, NavLink } from "react-router-dom";
import classes from "../styles/central.module.css";
import { styles } from "./MainNavigation";

export default function ErrorPage() {
  const error = useRouteError();
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
      <div className={classes.main_div}>
        <h2 className={classes.title}>Error Page</h2>
        <h2 className={classes.error}>{error.message}</h2>
      </div>
      <footer className={classes.main_footer}>
        &copy; 2023 Nilotpal &reg; MIT License
      </footer>
    </>
  );
}
