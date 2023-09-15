import { redirect, useLoaderData } from "react-router-dom";
import AddEditProductForm from "../components/AddEditProductForm";
import classes from "../styles/central.module.css";
import axios from "axios";

export default function EditProduct() {
  const loaderData = useLoaderData();

  return (
    <>
      <h2 className={classes.title}>Edit Product</h2>
      <AddEditProductForm product={loaderData?.product} method="PATCH" />
    </>
  );
}

export async function loader({ request, params }) {
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
}
