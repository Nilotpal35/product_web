import { useParams } from "react-router-dom";
import AddEditProductForm from "../components/AddEditProductForm";
import { useState } from "react";
import classes from "../styles/central.module.css";
import { useSelector } from "react-redux";

export default function EditProduct() {
  const { prodId } = useParams();
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

  const formHandler = (e) => {
    e.preventDefault();
    console.log("EDIT FORM DATA", formData);
  };

  const props = {
    formData: formData,
    setFormData: setFormData,
    formHandler: formHandler,
    action: `admin/edit-product`,
  };
  return (
    <>
      <h2 className={classes.title}>Edit Product</h2>
      <AddEditProductForm {...props} />
    </>
  );
}
