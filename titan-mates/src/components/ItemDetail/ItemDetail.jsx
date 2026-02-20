import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount";
import { CartContext } from "../../context/CartContext";

export default function ItemDetail({ item }) {
  const { addItem } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  const onAdd = (qty) => {
    addItem(item, qty);
    setAdded(true);
  };

  return (
    <section style={{ padding: 12 }}>
      <h2>{item.title}</h2>
      <p>Categoría: {item.category}</p>
      <p>Precio: ${item.price}</p>

      <hr style={{ margin: "16px 0" }} />

      {!added ? (
        <>
          <h4>Unidades</h4>
          
          <ItemCount stock={item.stock ?? 10} initial={1} onAdd={onAdd} />
        </>
      ) : (
        <div style={{ display: "flex", gap: 12 }}>
          <Link to="/cart">Ir al carrito</Link>
          <Link to="/">Seguir comprando</Link>
        </div>
      )}
    </section>
  );
}