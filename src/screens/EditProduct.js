import { json, useLoaderData } from "react-router-dom";
import AddEditProductForm from "../components/AddEditProductForm";
import { useState } from "react";
import { PRODUCTS } from "../store/ProductsList";
import classes from "../styles/central.module.css";

export default function EditProduct() {
  const loader = useLoaderData();
  console.log("LOADER DATA", loader);
  const [formData, setFormData] = useState({
    _id: loader?._id,
    title: loader?.title || "",
    price: loader?.price || "",
    imageUrl: loader?.imageUrl || "",
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
    action: `/admin/edit-product/${loader._id}`,
  };
  return (
    <>
      <h2 className={classes.title}>Edit Product</h2>
      <AddEditProductForm {...props} />
    </>
  );
}

export function loader({ request, params }) {
  const { prodId } = params;
  const product = PRODUCTS.find((item) => item._id === prodId);
  if (!product) {
    throw json(
      { mesage: "No Product found" },
      { status: 404, statusText: "No product found" }
    );
  } else {
    return product;
  }
}

export async function action({ request, params }) {
  const form = await request.formData();
  // const formData = {
  //   title: form.get("title"),
  //   imageUrl: form.get("imageUrl"),
  //   price: form.get("price"),
  //   description: form.get("description"),
  // };

  const formData = Object.fromEntries(form);
  console.log("Edit product FORM DATA IN ACTION", formData);
  fetch("http://localhost:8080/fileUpload", {
    method: request.method,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log("RESPONSE IN FETCH", res);
    })
    .catch((err) => {
      console.log("ERROR IN FETCH", err.message);
    });
  return "hello";
}
