import classes from "../styles/central.module.css";
import { greenSignals } from "../util/Signal";

export default function Toaster({ message, status }) {
  return (
    <p
      style={{
        backgroundColor: greenSignals.includes(status) ? "green" : "red",
        color: "white",
      }}
      className={classes.title}
    >
      {message || "Successfull"}
    </p>
  );
}
