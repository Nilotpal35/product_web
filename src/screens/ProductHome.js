import ProductGridTile from "../components/ProductGridTile";
import classes from "../styles/central.module.css";
import { PRODUCTS } from "../store/ProductsList";
import axios from "axios";
import { json, useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addProduct } from "../store/redux/productStore";

const ProductHome = () => {
  const loaderData = useLoaderData();
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  console.log("REDUX PRODUCTS", products);

  useEffect(() => {
    if (loaderData.length > 0) {
      dispatch(addProduct({ item: loaderData }));
    }
  }, []);
  return (
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
            />
          ))}
      </div>
    </div>
  );
};

export default ProductHome;

export async function loader() {
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
