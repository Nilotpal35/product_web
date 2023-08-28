import ProductGridTile from "../components/ProductGridTile";
import classes from "../styles/central.module.css";
import axios from "axios";
import { json, redirect, useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addProduct } from "../store/redux/productStore";
import Toaster from "../components/Toaster";

const ProductHome = () => {
  const [serverResponse, setServerResponse] = useState("");
  const loaderData = useLoaderData();

  useEffect(() => {
    if (serverResponse.trim().length > 0) {
      setTimeout(() => {
        setServerResponse("");
      }, 2000);
    }
  }, [serverResponse]);

  return (
    <>
      {serverResponse.trim().length > 0 && (
        <Toaster message={serverResponse} status={200} />
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
        process.env.REACT_APP_BACKEND_URI + "products",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
          },
        }
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
