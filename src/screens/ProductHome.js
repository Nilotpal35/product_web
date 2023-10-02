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
import { getAllProducts } from "../graphql/query";
import { greenSignals, redSignals } from "../util/Signal";

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
  const { message, statusCode, products, totalPages } = await getAllProducts(
    pageNo
  );
  console.log("message ", message, statusCode, products, totalPages);
  if (redSignals.includes(statusCode)) {
    console.log("red signal",statusCode);
    return { message, statusCode, products, totalPages };
  } else if (greenSignals.includes(statusCode)) {
    return { products, totalPages };
  }
}

export async function loader({ request, params }) {
  return defer({
    response: loadProduct({ request, params }),
  });
}
