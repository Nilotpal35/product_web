import { useActionData } from "react-router-dom";
import classes from "../styles/central.module.css";
import { useState } from "react";
import AddEditProductForm from "../components/AddEditProductForm";

export default function AddProduct() {
  const actionData = useActionData();
  console.log("ACTION DATA in add product", actionData);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    imageUrl: "",
    description: "",
  });

  const props = {
    formData: formData,
    setFormData: setFormData,
    action: `admin/add-product`,
  };

  return (
    <>
      {actionData && <h2 className={classes.error}>{actionData}</h2>}
      <h2 className={classes.title}>Add Product</h2>
      <AddEditProductForm {...props} />
    </>
  );
}
