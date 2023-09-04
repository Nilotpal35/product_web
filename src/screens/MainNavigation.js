import { Outlet, NavLink, useNavigation } from "react-router-dom";
import "../App.css";
import classes from "../styles/central.module.css";
import LoadingScreen from "../components/LodingScreen";

export default function MainNavigation() {
  const navigation = useNavigation();
  console.log("loading state in main navigation", navigation.state);

  return (
    <>
      <div className="App">
        <nav className="App-header">
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
        </nav>
        {navigation.state === "submitting" ? (
          <LoadingScreen fallbackText={"Processing..."} />
        ) : navigation.state === "loading" ? (
          <LoadingScreen fallbackText={"Loading..."} />
        ) : (
          <Outlet />
        )}
      </div>
      <footer className={classes.main_footer}>
        &copy; 2023 Nilotpal &reg; MIT License
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
