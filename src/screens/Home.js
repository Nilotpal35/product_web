import { Outlet, NavLink } from "react-router-dom";
import "../App.css";

export default function Home() {
  return (
    <div className="App">
      <nav className="App-header">
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
      </nav>
      <Outlet />
    </div>
  );
}

const styles = ({ isActive, isPending }) => {
  return {
    fontWeight: isActive ? "bold" : "",
    color: isPending ? "red" : "black",
    backgroundColor: isActive ? "purple" : "grey",
    textDecoration: "none",
    padding: "1rem",
    margin: "1rem",
    borderRadius: "8px",
  };
};
