import { Link, json, useLoaderData, useParams } from "react-router-dom";
import classes from "../styles/central.module.css";

export default function ProductDetail() {
  const productArray = useLoaderData();
  const product = productArray[0];
  return (
    <>
      <div className={classes.main_div}>
        <div className={classes.container}>
          <div className={classes.productDetail}>
            <img
              className={classes.dimage}
              src={product.imageUrl}
              alt={product.title}
            />
            <p className={classes.dtitle}>{product.title}</p>
            <p className={classes.dtitle}>{product.price}</p>
            <p className={classes.dtitle}>{product.description}</p>
            <Link
              className={classes.cartButton}
              to={`../edit-product/${product._id}`}
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export function loader({ request, params }) {
  const { prodId } = params;
  const result = [].filter((item) => item._id === prodId);
  if (result.length === 0) {
    throw json(
      { message: "No Product Found!" },
      { status: 404, statusText: "No Product found" }
    );
  }
  return result;
}
