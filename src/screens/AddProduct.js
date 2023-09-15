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
  return null;
}
