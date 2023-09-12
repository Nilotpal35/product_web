import classes from "../styles/central.module.css";
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import LoadingScreen from "./LodingScreen";
import axios from "axios";
import Toaster from "./Toaster";
import { useEffect, useState } from "react";
import { greenSignals } from "../util/Signal";

export default function AddEditProductForm({ product, method }) {
  const [formData, setFormData] = useState({
    _id: product?._id || "",
    title: product?.title || "",
    price: product?.price || "",
    imageUrl: "",
    description: product?.description || "",
  });

  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData && greenSignals.includes(actionData?.status)) {
      setTimeout(() => {
        navigate("/admin/product");
      }, 1000);
    }
  }, [actionData]);

  const titleValidation = formData?.title.length > 4;
  const descriptionValidation = formData.description.length > 5;
  const priceValidation = formData.price > 5 && formData.price < 99999;

  const validationResult =
    titleValidation && descriptionValidation && priceValidation;

  return (
    <>
      {actionData && (
        <Toaster message={actionData?.message} status={actionData?.status} />
      )}
      {navigation.state === "submitting" ? (
        <LoadingScreen fallbackText={"Submitting"} />
      ) : (
        <div className={classes.main_div}>
          <Form
            className={classes.form}
            method={method}
            encType="multipart/form-data"
          >
            <input type="hidden" name="_id" value={formData?._id || ""} />
            <label>TITLE</label>
            <input
              type="text"
              placeholder="title"
              name="title"
              className={classes.titleInput}
              value={formData.title}
              onChange={(e) => {
                setFormData((prevData) => {
                  return { ...prevData, title: e.target.value };
                });
              }}
              style={
                titleValidation
                  ? { border: "1px solid green" }
                  : { border: "2px solid red" }
              }
            />
            <label>IMAGE</label>
            <input
              type="file"
              name="imageUrl"
              placeholder="paste image link here"
              // value={formData.imageUrl}
              onChange={(e) => {
                setFormData((prevData) => {
                  return { ...prevData, imageUrl: e.target.files[0] };
                });
              }}
            />
            <label>PRICE</label>
            <input
              className={classes.titleInput}
              min={1}
              max={99999}
              type="number"
              name="price"
              placeholder="price"
              step={0.1}
              value={formData.price}
              onChange={(e) => {
                setFormData((prevData) => {
                  return { ...prevData, price: e.target.value };
                });
              }}
              style={
                priceValidation
                  ? { border: "1px solid yellow" }
                  : { border: "2px solid red" }
              }
            />
            <label>DESCRIPTION</label>
            <textarea
              rows={5}
              cols={5}
              name="description"
              value={formData.description}
              placeholder="description"
              onChange={(e) => {
                setFormData((prevData) => {
                  return { ...prevData, description: e.target.value };
                });
              }}
              style={
                descriptionValidation
                  ? { border: "1px solid yellow" }
                  : { border: "2px solid red" }
              }
            />
            <div className={classes.button_ctr}>
              <button type="submit" disabled={!validationResult}>
                {navigation.state === "submitting" ? "Submitting..." : "Submit"}
              </button>
              <button type="reset">Reset</button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
}

export async function action({ request, params }) {
  const userToken = localStorage.getItem("PU:TOKEN");
  if (!userToken) {
    return redirect("/login");
  }
  const form = await request.formData();
  const formData = Object.fromEntries(form);

  const GRAPHQL_URI = process.env.REACT_APP_BACKEND_URI + "graphql";
  const REST_URI = process.env.REACT_APP_BACKEND_URI + "upload-image";

  try {
    const file_upload_response = await axios.post(
      REST_URI,
      { imageUrl: formData.imageUrl },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
        },
      }
    );
    console.log("response in add edit cart form", file_upload_response.data);
    const query = `
      mutation createUpdateProduct($method : String!,$input : createUpdateProductData!){
        createUpdateProduct(method : $method,input : $input){
          message
          status
        }
      }
    `;
    const graphqlMutation = {
      query,
      variables: {
        method: request.method || "",
        input: {
          _id: formData._id || "",
          title: formData.title,
          imageUrl: file_upload_response.data?.filename || "",
          price: formData.price,
          description: formData.description,
        },
      },
    };
    const formUpload_response = await axios.post(GRAPHQL_URI, graphqlMutation, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
      },
    });
    console.log("graphql  response ", formUpload_response.data);
    const { errors, data } = formUpload_response.data;
    if (errors) {
      return {
        message: errors.join(","),
        status: 400,
      };
    }
    return {
      message: data.createUpdateProduct.message || "Successfull",
      status: data.createUpdateProduct.status || 201,
    };
    // }
  } catch (error) {
    console.log("errors in add edit product", error);
    throw json(
      error.response.data.errors[0].message ||
        error.response.data.message ||
        "error in addEdit form",
      {
        status: error?.response?.status || 404,
      }
    );
  }

  // const uri =
  //   process.env.REACT_APP_BACKEND_URI +
  //   (formData._id ? "admin/edit-product" : "admin/add-product");
  // console.log("URI", uri);

  // try {
  //   const response = await axios.post(uri, formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
  //     },
  //   });
  //   console.log("RESPONSE DATA", response?.data);
  //   //await new Promise((res) => setTimeout(res, 1000));
  //   return {
  //     message: response.data?.message,
  //     status: response.status,
  //     statusText: response.statusText,
  //   };
  // } catch (error) {
  //   if (error?.response) {
  //     return {
  //       message: error?.response?.data?.message,
  //       status: error?.response?.status,
  //       statusText: error?.response?.statusText,
  //     };
  //   } else {
  //     throw json(error?.message, { status: 400 });
  //   }
  // }

  // return {
  //   message: "demo message",
  //   status: 400,
  // };
}
