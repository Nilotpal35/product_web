import {
  Link,
  json,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import classes from "../styles/central.module.css";
import axios from "axios";
import CartGridTIle from "../components/CartGridTile";
import { greenSignals, redSignals } from "../util/Signal";
import { useEffect, useState } from "react";
import Toaster from "../components/Toaster";

export default function Cart() {
  const [serverResponse, setServerResponse] = useState("");
  const [serverStatus, setServerStatus] = useState("");
  const [cartProduct, setCartProduct] = useState();
  const actionData = useActionData();
  const { message, status, product } = useLoaderData();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (product.length > 0) {
      setCartProduct(product);
    }
  }, [product]);

  if (message && status) {
    setServerResponse(message);
    setServerStatus(status);
  }

  //evaluate total items in cart
  const cartQty = cartProduct?.reduce((curr, acc) => {
    return curr + +acc.qty;
  }, 0);

  //evaluate total sum of items in cart
  const totalPrice = cartProduct?.reduce((curr, acc) => {
    return (curr += +(+acc.price * acc.qty));
  }, 0);

  //place order
  const orderHandler = async () => {
    // submit({ prodId: "abcdefg" }, { method: "POST" });
    setLoader(true);
    // console.log("final order items", cartProduct);
    // const modifiedCart = cartProduct?.map((item) => {
    //   return { ...item, ...finalCartItems.find((i) => item.prodId === i._id) };
    // });
    console.log("final cart items", cartProduct);
    try {
      const mutation = `
      mutation postOrder($input : postOrderForm) {
          postOrder(input : $input) {
            message
            status
          }
      }`;
      const graphqlMutation = {
        mutation,
        variables: {
          input: cartProduct,
        },
      };

      const URI = process.env.REACT_APP_BACKEND_URI + "graphql";
      const response = await axios.post(URI, graphqlMutation);
      // const response = await axios.post(URI, modifiedCart, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     userid: localStorage.getItem("PU:TOKEN"),
      //     Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
      //   },
      // });
      console.log("response on post order", response.data);
      setServerResponse("response?.data?.message");
      setServerStatus(response?.status || 200);
    } catch (error) {
      console.log("error while ordering item", error);
      // json(error?.response?.data?.message, { status: error?.response?.status });
      setServerResponse("error?.response?.data?.message");
      setServerStatus(error?.response?.status || 400);
    }
    setTimeout(() => {
      setServerResponse("");
      setLoader(false);
    }, 2000);
  };

  return (
    <>
      {serverResponse.trim().length > 0 && (
        <Toaster
          message={actionData?.message || serverResponse}
          status={actionData?.status || serverStatus}
        />
      )}
      <div className={classes.main_div}>
        <div className={classes.cartHeader}>
          <p style={{ fontSize: "1rem", fontWeight: "600" }}>
            Total Items - {cartQty}
          </p>
          <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
            $ {totalPrice}
          </p>
        </div>
        <div className={classes.cartContainer}></div>
        {cartProduct?.length > 0 ? (
          cartProduct.map((item) => <CartGridTIle key={item._id} {...item} />)
        ) : (
          <h2 className={classes.title}>No items left in your cart</h2>
        )}
        {cartProduct?.length > 0 && (
          <>
            <hr style={hrStyle} />
            <button
              style={loader ? loaderButtonStyle : buttonStyle}
              onClick={orderHandler}
              disabled={loader}
            >
              {loader ? "Ordering..." : "Order Now"}
            </button>
          </>
        )}
      </div>
      {/* <p>Cart page</p> */}
    </>
  );
}

export async function loader({ request, params }) {
  const userToken = localStorage.getItem("PU:TOKEN");
  if (!userToken) {
    return redirect("/login");
  }
  try {
    const URI = process.env.REACT_APP_BACKEND_URI + "graphql";
    const query = `
        query postCartItems($userId : String) {
          postCartItems(userId : $userId){
            product {
              _id
              title
              imageUrl
              price
              description
              qty
            }
          }
        }
    `;
    const graphqlQuery = {
      query,
      variables: {
        userId: userToken,
      },
    };
    const response = await axios.post(URI, graphqlQuery, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
      },
    });
    console.log("RESPONSE IN CART", response.data);
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
        status: 400,
        product: [],
      };
    }
    return { product: data.postCartItems.product };

    //REST APIs

    // const response = await axios.get(URI, {
    //   headers: {
    //     "Content-Type": "applcation/json",
    //     userid: userToken,
    //     Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
    //   },
    // });
    // const URI2 = process.env.REACT_APP_BACKEND_URI + "products";
    // const response2 = await axios.get(URI2, {
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
    //   },
    // });
    // if (response.data) {
    //   return { cart: response.data, allProducts: response2?.data };
    // } else {
    //   throw json("No cart fetched", {
    //     status: response.status,
    //     statusText: response.statusText,
    //   });
    // }
  } catch (error) {
    console.log("ERROR IN AXIOS CART LOADER", error);

    //this condition is only for checking is the jwt token got expired or not
    if (error?.response?.data?.errors[0].message === "User not Authorized!") {
      return redirect("/login");
    }

    throw json(error?.response?.data?.message, {
      status: error?.response?.status,
      statusText: error?.response?.statusText,
    });
  }
}

export async function action({ request, params }) {
  const userToken = localStorage.getItem("PU:TOKEN");
  if (!userToken) {
    return redirect("/login");
  }
  if (request.method === "DELETE") {
    const formData = await request.formData();
    const prodId = formData.get("prodId");
    console.log("PROD ID", prodId);
    try {
      const URI = process.env.REACT_APP_BACKEND_URI + `graphql`;
      const query = `
        mutation postDeleteCart($prodId : String!) {
          postDeleteCart(prodId : $prodId){
            message
            status
          }
        }
    `;
      const graphqlQuery = {
        query,
        variables: {
          // input: {
          ///userId: localStorage.getItem("PU:TOKEN"),
          prodId: prodId,
          // },
        },
      };
      const response = await axios.post(URI, graphqlQuery, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
        },
      });

      console.log("DELETE CART RESPONSE DATA", response.data);
      // const { errors, data } = response.data;
      // if (errors) {
      //   let errorMessage = "";
      //   errors?.map((item) => {
      //     errorMessage += "-> " + item.message;
      //   });
      //   return {
      //     message: errorMessage,
      //     status: 400,
      //   };
      // }
      return {
        message: "data.postDeleteCart.message",
        status: 200,
      };

      //REST APIs

      // const response = await axios.delete(URI, {
      //   headers: {
      //     userid: localStorage.getItem("PU:TOKEN") || "",
      //     Authorization: "Bearer " + localStorage.getItem("JWT:TOKEN"),
      //   },
      // });
      // console.log("response in delete cart", response.data);
      // return { message: response.data.message, status: response.status };
    } catch (error) {
      throw json(error?.response?.data?.message, {
        status: error?.response?.status,
        statusText: error?.response?.statusText,
      });
    }
  }
}

const buttonStyle = {
  padding: "1rem",
  backgroundColor: "rgb(200,100,150)",
  fontSize: "1rem",
  fontWeight: "600",
  borderStyle: "none",
};
const loaderButtonStyle = {
  padding: "1rem",
  backgroundColor: "grey",
  color: "black",
  fontSize: "1rem",
  fontWeight: "500",
  borderStyle: "none",
};

const hrStyle = {
  width: "90%",
  border: "1px solid black",
  borderRadius: "4px",
  margin: "1rem 0",
};
