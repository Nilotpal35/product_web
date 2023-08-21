import { Link } from "react-router-dom";
import classes from "../styles/central.module.css";

export default function Login() {
  return (
    <div
      className={[classes.main_div]}
      style={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2 className={classes.title}>Login page</h2>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Link
          to={"login"}
          className={[classes.button]}
          style={{ padding: "1rem" }}
        >
          Login
        </Link>
        <Link
          to={"signUp"}
          className={[classes.button]}
          style={{ padding: "1rem" }}
        >
          SignUp
        </Link>
      </div>
    </div>
  );
}
