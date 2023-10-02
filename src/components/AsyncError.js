import { useAsyncError } from "react-router-dom";

export default function AsyncError() {
  const error = useAsyncError();
  console.log("inside async  error", error);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
        width: "100%",
        height:"auto"
      }}
    >
      <p style={{ textAlign: "center",padding:"0.1rem 0"}}>
        {error?.message || "Could not able to load this page"}
      </p>
    </div>
  );
}
