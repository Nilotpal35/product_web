import ProductGridTile from "../components/ProductGridTile";
import classes from "../styles/central.module.css";

const PRODUCTS = [
  {
    _id: "p1",
    title: "Product 1",
    price: "46",
    imageUrl: "https://unsplash.com/photos/e616t35Vbeg",
    description: "This is product 1",
  },
  {
    _id: "p2",
    title: "Product 2",
    price: "46",
    imageUrl: "https://unsplash.com/photos/dSBJv66Yjlk",
    description: "This is product 2",
  },
  {
    _id: "p3",
    title: "Product 3",
    price: "46",
    imageUrl: "https://unsplash.com/photos/xtRL02ZuZxE",
    description: "This is product 3",
  },
  {
    _id: "p4",
    title: "Product 4",
    price: "46",
    imageUrl: "https://unsplash.com/photos/0F2nvpob0_c",
    description: "This is product 4",
  },
  {
    _id: "p5",
    title: "Product 5",
    price: "46",
    imageUrl: "https://unsplash.com/photos/XFWg9u0TYs4",
    description: "This is product 5",
  },
];

const ProductHome = () => {
  return (
    <div className={classes.products}>
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
  );
};

export default ProductHome;
