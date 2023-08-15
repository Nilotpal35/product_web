export default function ProductGridTile({
  _id,
  title,
  price,
  imageUrl,
  description,
}) {
  return (
    <div>
      <p>{_id}</p>
      <h2>{title}</h2>
      <h2>{price}</h2>
      <img src={imageUrl} alt={title} />
      <h2>{description}</h2>
    </div>
  );
}
