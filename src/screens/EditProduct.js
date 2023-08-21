import { useActionData, useLocation, useNavigate } from "react-router-dom";
import AddEditProductForm from "../components/AddEditProductForm";
import { useEffect, useState } from "react";
import classes from "../styles/central.module.css";
import { useSelector } from "react-redux";

export default function EditProduct() {
  const actionData = useActionData();
  const location = useLocation();
  const searchparams = new URLSearchParams(location.search);
  const prodId = searchparams.get("prodId");
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData && actionData?.status === 201) {
      setTimeout(() => {
        navigate("/admin/product");
      }, 1000);
    }
  }, [actionData]);

  const ALL_PRODUCTS_REDUX = useSelector((state) => state.product.products);
  const loader = ALL_PRODUCTS_REDUX.find((item) => item._id === prodId);
  console.log("LOADER DATA", ALL_PRODUCTS_REDUX, prodId);

  const [formData, setFormData] = useState({
    _id: loader?._id || "",
    title: loader?.title || "",
    price: loader?.price || "",
    imageUrl: "",
    description: loader?.description || "",
  });

  const props = {
    formData: formData,
    setFormData: setFormData,
    action: `admin/edit-product`,
  };

  return (
    <>
      {actionData && (
        <h2
          className={classes.title}
          style={
            actionData.status === 201 ? { color: "green" } : { color: "red" }
          }
        >
          {actionData.message}
        </h2>
      )}
      <h2 className={classes.title}>Edit Product</h2>
      <AddEditProductForm {...props} />
    </>
  );
}
