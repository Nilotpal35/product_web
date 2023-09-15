import {
  Await,
  defer,
  json,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import classes from "../styles/central.module.css";
import axios from "axios";
import Toaster from "../components/Toaster";
import { SuspenceComponent } from "../App";
import AsyncError from "../components/AsyncError";
import CartPage from "../components/CartPage";

export default function Cart() {
  const actionData = useActionData();
  const loaderData = useLoaderData();

  return (
    <>
      {actionData && (
        <Toaster
          message={actionData?.actionMessage}
          status={actionData?.actionStatus}
        />
      )}
      <div className={classes.cartContainer}>
        {SuspenceComponent(
          <Await resolve={loaderData.carts} errorElement={<AsyncError />}>
            {(resolvedCart) => <CartPage {...resolvedCart} />}
          </Await>
        )}
      </div>
    </>
  );
}

export async function cartLoader({ request, params }) {
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
        userId: localStorage.getItem("PU:TOKEN"),
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

export async function loader({ request, params }) {
  return defer({
    carts: cartLoader({ request, params }),
  });
}

export async function action({ request, params }) {
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
      const { errors, data } = response.data;
      if (errors) {
        let errorMessage = "";
        errors?.map((item) => {
          errorMessage += "-> " + item.message;
        });
        return {
          actionMessage: errorMessage,
          actionStatus: 400,
        };
      }
      return {
        actionMessage: data.postDeleteCart.message,
        actionStatus: 200,
      };
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
