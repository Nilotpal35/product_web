import ProductGridTile from "../components/ProductGridTile";
import classes from "../styles/central.module.css";
import axios from "axios";
import {
  Link,
  NavLink,
  json,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { addProduct } from "../store/redux/productStore";
import Toaster from "../components/Toaster";

const ProductHome = () => {
  const [serverResponse, setServerResponse] = useState("");
  const loaderData = useLoaderData();
  const location = useLocation();
  const searchparams = new URLSearchParams(location.search);
  const page = searchparams.get("page");
  console.log("page no => ", page, loaderData);
  // const navigate = useNavigate();

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
          {loaderData?.products &&
            loaderData?.products.map((item) => (
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
        <div style={{ position: "absolute", bottom: "100px" }}>
          {
            for(let i in loaderData.totalpages)
            {
              <NavLink
                to={"/admin/product?page=1"}
                style={{
                  backgroundColor: page == item ? "purple" : "grey",
                  color: page == item ? "white" : "black",
                  fontSize: "1rem",
                  padding: "1rem",
                }}
              >
                {item}
              </NavLink>
              }}
          {/* <NavLink
            to={"/admin/product?page=1"}
            style={{
              backgroundColor: page == 1 || page == null ? "purple" : "grey",
              color: page == 1 || page == null ? "white" : "black",
              fontSize: "1rem",
              padding: "1rem",
            }}
          >
            1
          </NavLink>
          <NavLink
            to={"/admin/product?page=2"}
            style={{
              backgroundColor: page == 2 ? "purple" : "grey",
              color: page == 2 ? "white" : "black",
              fontSize: "1em",
              padding: "1rem",
            }}
          >
            2
          </NavLink>
          <NavLink
            to={"/admin/product?page=3"}
            style={{
              backgroundColor: page == 3 ? "purple" : "grey",
              color: page == 3 ? "white" : "black",
              fontSize: "1rem",
              padding: "1rem",
            }}
          >
            3
          </NavLink>
          <NavLink
            to={"/admin/product?page=4"}
            style={{
              backgroundColor: page == 4 ? "purple" : "grey",
              color: page == 4 ? "white" : "black",
              fontSize: "1rem",
              padding: "1rem",
            }}
          >
            4
          </NavLink> */}
        </div>
      </div>
    </>
  );
};

export default ProductHome;

export async function loader({ request, params }) {
  const pageNo = request.url?.split("?")[1]?.split("=")[1];
  const userToken = localStorage.getItem("PU:TOKEN");
  if (!userToken) {
    return redirect("/login");
  } else {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URI + `products?page=${pageNo}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
          },
        }
      );
      if (response.data) {
        return {
          products: response.data.products,
          totalpages: response.data.totalPage,
        };
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
