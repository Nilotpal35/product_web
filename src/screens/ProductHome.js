import { Outlet } from "react-router-dom";
import ProductGridTile from "../components/ProductGridTile";
import classes from "../styles/central.module.css";
import { PRODUCTS } from "../store/ProductsList";

const ProductHome = () => {
  return (
    <div className={classes.main_div}>
      <div className={classes.container}>
        {/* <h2>This is product page</h2> */}
        {PRODUCTS.map((item) => (
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
