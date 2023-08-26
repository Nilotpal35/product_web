import {
  Link,
  Navigate,
  json,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import classes from "../styles/central.module.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import axios from "axios";

export default function Cart() {
  const cartQty = 0;
  const totalPrice = 0;
  const { cartItems } = useLoaderData();
  console.log("CART ITEMS", cartItems);
  const productQty = 1;
  const navigate = useNavigate();
  const reduxProducts = useSelector((state) => state.product.products);
  console.log("REDUX PRODUCTS IN CART", reduxProducts);

  const CartItems = cartItems.map((item) => (
    <div key={item._id} className={classes.cartProducts}>
      <img className={classes.cartImage} src={item.imageUrl} alt={item.title} />
      <p className={classes.cartTitle}>
        {item.title} X {productQty}{" "}
      </p>
      <div className={classes.cartBtnCtr}>
        <Link className={classes.cartButton} to={`/admin/detail/${item._id}`}>
          Delete
        </Link>
        <Link className={classes.cartButton} to={`/admin/detail/${item._id}`}>
          Details
        </Link>
      </div>
    </div>
  ));
  return (
    <>
      <div className={classes.main_div}>
        <div className={classes.cartHeader}>
          <h2>Totla Items X {cartQty}</h2>
          <h2>{totalPrice}</h2>
        </div>
        <div className={classes.cartContainer}></div>
        {CartItems}
      </div>
    </>
  );
}

export async function loader({ request, params }) {
  const userToken = localStorage.getItem("PU:TOKEN");
  if (!userToken) {
    return redirect("/login");
  }
  try {
    const URI = process.env.REACT_APP_BACKEND_URI + "cart";
    const response = await axios.get(URI, {
      headers: {
        "Content-Type": "applcation/json",
        userid: userToken,
      },
    });
    if (response.data) {
      return response.data;
    } else {
      throw json("No cart fetched", {
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
