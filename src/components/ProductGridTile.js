import { Link } from "react-router-dom";
import classes from "../styles/central.module.css";

export default function ProductGridTile({
  _id,
  title,
  price,
  imageUrl,
  description,
}) {
  return (
    <div className={classes.products}>
      {/* <p>{_id}</p> */}
      <img src={imageUrl} alt={title} className={classes.image} />
      <p className={classes.title}>{title}</p>
      {/* <h2>{price}</h2> */}
      {/* <h2>{description}</h2> */}
      <div className={classes.btnCtr}>
        <Link to="#" className={classes.button}>
          Add
        </Link>
        {/* <Link>Delete</Link> */}
        <Link to={`/admin/detail/${_id}`} className={classes.button}>
          Details
        </Link>
      </div>
    </div>
  );
}
