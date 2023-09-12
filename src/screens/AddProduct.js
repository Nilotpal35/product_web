import { redirect} from "react-router-dom";
import classes from "../styles/central.module.css";
import AddEditProductForm from "../components/AddEditProductForm";


export default function AddProduct() {

  return (
    <>
      <h2 className={classes.title}>Add Product</h2>
      <AddEditProductForm method="POST" />
    </>
  );
}

export async function loader({ request, params }) {
  const userToken = localStorage.getItem("PU:TOKEN");
  if (!userToken) {
    return redirect("/login");
  } else {
    return 1;
  }
}
