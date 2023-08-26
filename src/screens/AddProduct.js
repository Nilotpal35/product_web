import { redirect, useActionData, useNavigate } from "react-router-dom";
import classes from "../styles/central.module.css";
import { useEffect, useState } from "react";
import AddEditProductForm from "../components/AddEditProductForm";

export default function AddProduct() {
  const actionData = useActionData();
  const navigate = useNavigate();
  const greenSignal = [200, 201, 300, 301];
  console.log("signal testing", greenSignal.includes(200));

  useEffect(() => {
    if (actionData && greenSignal.includes(actionData?.status)) {
      setTimeout(() => {
        navigate("/admin/product");
      }, 1000);
    }
  }, [actionData]);

  console.log("ACTION DATA", actionData);

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
      {actionData && (
        <h2
          className={classes.title}
          style={
            greenSignal.includes(actionData?.status)
              ? { color: "green" }
              : { color: "red" }
          }
        >
          {actionData.message}
        </h2>
      )}
      <h2 className={classes.title}>Add Product</h2>
      <AddEditProductForm {...props} />
    </>
  );
}

export async function loader({ request, params }) {
  const userToken = localStorage.getItem("PU:TOKEN");
  if (!userToken) {
    return redirect("/login");
  }
}
