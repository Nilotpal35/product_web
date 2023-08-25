import ProductGridTile from "../components/ProductGridTile";
import classes from "../styles/central.module.css";
import { PRODUCTS } from "../store/ProductsList";
import axios from "axios";
import { json, redirect, useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addProduct } from "../store/redux/productStore";

const ProductHome = () => {
  const [serverResponse, setServerResponse] = useState("");
  const loaderData = useLoaderData();
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  console.log("REDUX PRODUCTS", products);

  useEffect(() => {
    if (serverResponse.trim().length > 0) {
      setTimeout(() => {
        setServerResponse("");
      }, 2000);
    }
  }, [serverResponse]);

  useEffect(() => {
    if (loaderData.length > 0) {
      dispatch(addProduct({ item: loaderData }));
    }
  }, []);
  return (
    <>
      {serverResponse.trim().length > 0 && (
        <h2 className={classes.title} style={{ color: "green" }}>
          {serverResponse}
        </h2>
      )}
      <div className={classes.main_div}>
        <div className={classes.container}>
          {/* <h2>This is product page</h2> */}
          {loaderData &&
            loaderData.map((item) => (
              <ProductGridTile
                key={item._id}
                _id={item._id}
                title={item.title}
                price={item.price}
                description={item.description}
                imageUrl={item.imageUrl}
                serverResponse={serverResponse}
                setServerResponse={setServerResponse}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductHome;

export async function loader() {
  const userToken = localStorage.getItem("PU:TOKEN");
  if (!userToken) {
    return redirect("/login");
  } else {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URI + "products"
      );
      if (response.data) {
        return response.data;
      } else {
        throw json("No products fetched", {
          status: response.status,
          statusText: response.statusText,
        });
      }
    } catch (error) {
      throw json(error.message, {
        status: error.status,
        statusText: error.statusText,
      });
    }
  }
}
