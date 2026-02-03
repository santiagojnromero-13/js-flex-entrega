import { Link } from "react-router-dom";

export default function Item({ id, title, price, category }) {
  return (
    <article style={{ border: "1px solid #ddd", padding: 12, borderRadius: 10 }}>
      <p style={{ opacity: 0.7, margin: 0 }}>{category}</p>
      <h3 style={{ margin: "8px 0" }}>{title}</h3>
      <p style={{ margin: "8px 0" }}>${price}</p>
      <Link to={`/item/${id}`}>Ver detalle</Link>
    </article>
  );
}
