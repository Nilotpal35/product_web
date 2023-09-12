import { useEffect, useState } from "react";
import classes from "../styles/central.module.css";
import { greenSignals } from "../util/Signal";

export default function Toaster({ message, status }) {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    setFlag(true);
    setTimeout(() => {
      setFlag(false);
    }, 2000);
  }, [message]);
  return (
    <>
      {flag && (
        <p
          style={{
            backgroundColor: greenSignals.includes(status) ? "green" : "red",
            color: "white",
          }}
          className={classes.title}
        >
          {message}
        </p>
      )}
    </>
  );
}
