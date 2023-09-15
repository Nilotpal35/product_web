import { Link } from "react-router-dom";
import classes from "../styles/central.module.css";
import { getAuthToken } from "../util/auth";

export default function Login() {
  const token = getAuthToken();
  console.log("TOKEN", token);
  return (
    <div
      className={[classes.main_div]}
      style={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2 className={classes.title}>Welcome!</h2>
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
