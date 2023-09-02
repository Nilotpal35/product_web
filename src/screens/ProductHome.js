import ProductGridTile from "../components/ProductGridTile";
import classes from "../styles/central.module.css";
import axios from "axios";
import {
  // Link,
  NavLink,
  json,
  redirect,
  useLoaderData,
  useLocation,
  // useNavigate,
} from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { addProduct } from "../store/redux/productStore";
import Toaster from "../components/Toaster";

const ProductHome = () => {
  const [serverResponse, setServerResponse] = useState("");
  const [serverStatus, setServerStatus] = useState(null);
  const loaderData = useLoaderData();
  const location = useLocation();
  const searchparams = new URLSearchParams(location.search);
  const page = searchparams.get("page");
  console.log("page no => ", page, loaderData);
  // const navigate = useNavigate();

  useEffect(() => {
    if (loaderData?.message) {
      setServerResponse(loaderData?.message);
      setServerStatus(loaderData?.status);
    }
  }, [loaderData]);

  useEffect(() => {
    if (serverResponse.trim().length > 0) {
      setTimeout(() => {
        setServerResponse("");
        setServerStatus(null);
      }, 2000);
    }
  }, [serverResponse]);

  return (
    <>
      {serverResponse.trim().length > 0 && (
        <Toaster message={serverResponse} status={serverStatus} />
      )}
      <div className={classes.main_div}>
        <div className={classes.container}>
          {/* <h2>This is product page</h2> */}
          {loaderData?.products &&
            loaderData?.products?.map((item) => (
              <ProductGridTile
                key={item._id}
                _id={item._id}
                title={item.title}
                price={item.price}
                description={item.description}
                imageUrl={item.imageUrl}
                serverResponse={serverResponse}
                setServerResponse={setServerResponse}
                serverStatus={serverStatus}
                setServerStatus={setServerStatus}
              />
            ))}
        </div>
        <div style={{ position: "absolute", bottom: "100px" }}>
          {loaderData?.totalPages?.map((item) => (
            <NavLink
              to={`/admin/product?page=${item}`}
              style={{
                backgroundColor: page == item ? "purple" : "grey",
                color: page == item ? "white" : "black",
                fontSize: "1rem",
                padding: "1rem",
              }}
            >
              {item}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductHome;

export async function loader({ request, params }) {
  const userToken = localStorage.getItem("PU:TOKEN");
  if (!userToken) {
    return redirect("/login");
  } else {
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
      throw json(error.response.data.message, {
        status: error.response.status,
        statusText: error.response.statusText,
      });
    }
  }
}
