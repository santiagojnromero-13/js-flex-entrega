import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeItem, clearCart, totalPrice } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <section style={{ padding: 12 }}>
        <h2>Carrito</h2>
        <p>Tu carrito está vacío.</p>
        <Link to="/">Volver al catálogo</Link>
      </section>
    );
  }

  return (
    <section style={{ padding: 12 }}>
      <h2>Carrito</h2>

      {cart.map((p) => (
        <div key={p.id} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
          <div style={{ flex: 1 }}>
            <strong>{p.title}</strong>
            <div>Cantidad: {p.quantity}</div>
            <div>Precio: $ {p.price}</div>
            <div>Subtotal: $ {p.price * p.quantity}</div>
          </div>
          <button onClick={() => removeItem(p.id)}>Eliminar</button>
        </div>
      ))}

      <h3>Total: $ {totalPrice}</h3>

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={clearCart}>Vaciar carrito</button>
        <Link to="/checkout">Finalizar compra</Link>
      </div>
    </section>
  );
}