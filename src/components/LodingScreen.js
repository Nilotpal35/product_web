import classes from "../styles/central.module.css";

export default function LoadingScreen({ fallbackText }) {
  return (
    <div className={classes.loaderMain}>
      <div className={classes.loader}></div>
      <p>{fallbackText || "wait bro..."}</p>
    </div>
  );
}
