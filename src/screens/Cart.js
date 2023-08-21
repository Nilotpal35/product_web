import { Link, Navigate, useLoaderData, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../store/ProductsList";
import classes from "../styles/central.module.css";
import { useSelector } from "react-redux/es/hooks/useSelector";

export default function Cart() {
  const cartQty = 0;
  const totalPrice = 0;
  const products = useLoaderData();
  const productQty = 1;
  const navigate = useNavigate();
  const reduxProducts = useSelector((state) => state.product.products);
  console.log("REDUX PRODUCTS IN CART", reduxProducts);

  const CartItems = products.map((item) => (
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

export function loader({ request, params }) {
  const response = PRODUCTS;
  return response;
}
