import {
  redirect,
  useActionData,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AddEditProductForm from "../components/AddEditProductForm";
import { useEffect, useState } from "react";
import classes from "../styles/central.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { greenSignals, redSignals } from "../util/Signal";

export default function EditProduct() {
  const [flag, setFlag] = useState(false);

  const actionData = useActionData();
  const location = useLocation();
  // const searchparams = new URLSearchParams(location.search);
  // const prodId = searchparams.get("prodId");
  const navigate = useNavigate();
  const loaderData = useLoaderData();
  // console.log("product detail", loaderData);

  useEffect(() => {
    if (actionData && actionData?.status === 201) {
      setTimeout(() => {
        navigate("/admin/product");
      }, 1000);
    } else if (actionData && redSignals.includes(actionData?.status)) {
      setFlag(true);
      setTimeout(() => {
        setFlag(false);
      }, 2000);
    }
  }, [actionData]);

  useEffect(() => {
    if (loaderData && loaderData?.status) {
      setFlag(true);
      setTimeout(() => {
        setFlag(false);
      }, 2000);
    }

    return () => {
      setFlag(false);
    };
  }, [loaderData]);

  const [formData, setFormData] = useState({
    _id: loaderData?.product?._id || "",
    title: loaderData?.product?.title || "",
    price: loaderData?.product?.price || "",
    imageUrl: "",
    description: loaderData?.product?.description || "",
  });

  const props = {
    formData: formData,
    setFormData: setFormData,
    action: `admin/edit-product`,
  };

  return (
    <>
      {actionData && flag && (
        <h2
          className={classes.title}
          style={
            greenSignals.includes(actionData?.status)
              ? { color: "green" }
              : { color: "red" }
          }
        >
          {actionData?.message}
        </h2>
      )}
      {loaderData && !actionData && flag && (
        <h2
          className={classes.title}
          style={
            greenSignals.includes(loaderData.status)
              ? { color: "green" }
              : { color: "red" }
          }
        >
          {loaderData?.message}
        </h2>
      )}
      <h2 className={classes.title}>Edit Product</h2>
      <AddEditProductForm {...props} />
    </>
  );
}

export async function loader({ request, params }) {
  const userToken = localStorage.getItem("PU:TOKEN");
  if (!userToken) {
    return redirect("/login");
  }
  const prodId = request?.url?.split("?")[1]?.split("=")[1];

  const query = `
    query getSingleProductById($prodId : String!) {
      getSingleProductById(prodId : $prodId) {
        _id
        title
        price
        imageUrl
        description
      }
    }
  `;
  const graphqlQuery = {
    query,
    variables: {
      prodId: prodId,
    },
  };

  const URI = process.env.REACT_APP_BACKEND_URI + "graphql";
  try {
    const response = await axios.post(URI, graphqlQuery, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
      },
    });
    const { errors, data } = response.data;
    if (errors) {
      if (errors[0].message === "User not Authorized!") {
        return redirect("/login");
      }
      let errorMessage = "";
      errors.map((item) => {
        errorMessage += "-> " + item.message;
      });
      return {
        message: errorMessage,
        status: 404,
      };
    }
    return {
      product: data?.getSingleProductById,
      message: "Successfull",
      status: 200,
    };
  } catch (error) {
    return {
      message: error?.response?.data?.errors[0]?.message || "error in backend",
      status: error?.response?.status || 500,
    };
  }

  // return "hello";
}
