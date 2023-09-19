import React, { useCallback } from "react";
import classes from "../styles/central.module.css";
import axios from "axios";
import {
  Await,
  defer,
  json,
  redirect,
  useLoaderData,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { SuspenceComponent } from "../App";
import Searchbar from "../components/SearchBar";
import ProductPage from "../components/ProductPage";
import AsyncError from "../components/AsyncError";

const ProductHome = () => {
  const loaderData = useLoaderData();
  return (
    <>
      <Searchbar />

      <>
        {SuspenceComponent(
          <Await resolve={loaderData.response} errorElement={<AsyncError />}>
            {(resolvedProducts) => <ProductPage {...resolvedProducts} />}
          </Await>
        )}
      </>
    </>
  );
};

export default ProductHome;

export async function loadProduct({ request, params }) {
  const pageNo = request.url?.split("?")[1]?.split("=")[1];
  const query = `
      query postProducts($page : Int){
        postProducts(page : $page) {
          products {
            _id
            title
            price
            imageUrl
            description
          }
          totalPages
        }
      }
    `;
  const graphqlQuery = {
    query,
    variables: {
      page: +pageNo,
    },
  };
  try {
    const URI = process.env.REACT_APP_BACKEND_URI + "graphql";
    const response = await axios.post(URI, graphqlQuery, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
      },
    });
    const { errors, data } = response.data;
    if (errors) {
      if (errors[0].message === "User not Authorized") {
        return redirect("/login");
      }
      let errorMessage = "";
      errors.map((item) => {
        errorMessage += "-> " + item.message;
      });

      return {
        message: errorMessage,
        status: 400,
        statusText: "error with login data",
        products: [],
        totalPages: [],
      };
    } else {
      const { products, totalPages } = response.data.data.postProducts;
      // console.log("Response in products page", products, totalPages);
      return { products, totalPages };
    }
  } catch (error) {
    console.log("Axios error", error);
    //this condition is only for checking is the jwt token got expired or not
    if (error?.response?.data?.errors[0].message === "User not Authorized") {
      console.log("isnide axios error");
      throw json(error.response.data.message, {
        status: error.response.status,
        statusText: error.response.statusText,
      });
    }
    // return { message: error?.response?.data?.errors[0].message };
  }
}

export async function loader({ request, params }) {
  return defer({
    response: loadProduct({ request, params }),
  });
}
