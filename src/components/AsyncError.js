import { useAsyncError } from "react-router-dom";

export default function AsyncError() {
  const error = useAsyncError();
  console.log("inside async  error", error);
  return (
    <div>
      <p>{error?.message}</p>
    </div>
  );
}
