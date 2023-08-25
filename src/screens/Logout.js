import { Link, useLocation, useNavigate, useNavigation } from "react-router-dom";
import classes from "../styles/central.module.css";

export default function LogOut() {
  const navigate = useNavigate();
  const logOutHandler = async () => {
    const userToken = localStorage.getItem("PU:TOKEN");
    const userName = localStorage.getItem("PU:USER");
    if (userName && userToken) {
      try {
        localStorage.removeItem("PU:TOKEN");
        localStorage.removeItem("PU:USER");
        console.log("Successfully logged Out");
        console.log("USER TOKEN", userToken && userToken);
        console.log("USER NAME", userName && userName);

        console.log("LOGOUT CLICKED");
        navigate("/login");
      } catch (error) {
        console.log("error happend");
      }
    }
  };
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
          to={"#"}
          className={[classes.button]}
          style={{ padding: "1rem" }}
          onClick={logOutHandler}
        >
          LogOut
        </Link>
        <Link
          to={"#"}
          className={[classes.button]}
          style={{ padding: "1rem" }}
          onClick={navigate()}
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}
