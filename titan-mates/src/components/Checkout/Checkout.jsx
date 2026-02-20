import { useContext, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function Checkout() {
  const { cart, totalPrice, totalQuantity, clearCart } = useContext(CartContext);

  const [buyer, setBuyer] = useState({ name: "", phone: "", email: "", email2: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  if (totalQuantity === 0 && !orderId) {
    return (
      <main style={{ padding: 12 }}>
        <h2>Checkout</h2>
        <p>No hay productos en el carrito.</p>
        <Link to="/">Volver al catálogo</Link>
      </main>
    );
  }

  const handleChange = (e) => setBuyer((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!buyer.name.trim()) next.name = "Nombre obligatorio";
    if (!buyer.phone.trim()) next.phone = "Teléfono obligatorio";
    if (!buyer.email.trim()) next.email = "Email obligatorio";
    if (buyer.email !== buyer.email2) next.email2 = "Los emails no coinciden";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const order = {
        buyer: { name: buyer.name, phone: buyer.phone, email: buyer.email },
        items: cart.map((p) => ({ id: p.id, title: p.title, price: p.price, quantity: p.quantity })),
        total: totalPrice,
        createdAt: serverTimestamp(),
      };

      const ref = collection(db, "orders");
      const docRef = await addDoc(ref, order);

      setOrderId(docRef.id);
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Error creando la orden. Revisá consola.");
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <main style={{ padding: 12 }}>
        <h2>Compra confirmada ✅</h2>
        <p>Tu número de orden es:</p>
        <h3 style={{ marginTop: 6 }}>{orderId}</h3>
        <Link to="/">Volver al catálogo</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: 12, maxWidth: 520 }}>
      <h2>Checkout</h2>
      <p>
        Total: <strong>${totalPrice}</strong>
      </p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
        <div>
          <label>Nombre</label>
          <input name="name" value={buyer.name} onChange={handleChange} />
          {errors.name && <p style={{ color: "crimson", margin: 0 }}>{errors.name}</p>}
        </div>

        <div>
          <label>Teléfono</label>
          <input name="phone" value={buyer.phone} onChange={handleChange} />
          {errors.phone && <p style={{ color: "crimson", margin: 0 }}>{errors.phone}</p>}
        </div>

        <div>
          <label>Email</label>
          <input name="email" value={buyer.email} onChange={handleChange} />
          {errors.email && <p style={{ color: "crimson", margin: 0 }}>{errors.email}</p>}
        </div>

        <div>
          <label>Repetir Email</label>
          <input name="email2" value={buyer.email2} onChange={handleChange} />
          {errors.email2 && <p style={{ color: "crimson", margin: 0 }}>{errors.email2}</p>}
        </div>

        <button disabled={loading}>{loading ? "Generando orden..." : "Confirmar compra"}</button>
      </form>
    </main>
  );
}