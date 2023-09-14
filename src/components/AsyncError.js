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
      }}
    >
      <p style={{ textAlign: "center" }}>
        {error?.message || "Could not able to load this page"}
      </p>
    </div>
  );
}
