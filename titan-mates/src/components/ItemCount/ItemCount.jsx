import { useState } from "react";

export default function ItemCount({ stock = 0, initial = 1, onAdd }) {
  const [count, setCount] = useState(initial);

  const decrease = () => setCount((c) => (c > 1 ? c - 1 : c));
  const increase = () => setCount((c) => (c < stock ? c + 1 : c));

  return (
    <div style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
      <button onClick={decrease}>-</button>
      <span style={{ minWidth: 24, textAlign: "center" }}>{count}</span>
      <button onClick={increase}>+</button>
      <button onClick={() => onAdd(count)} disabled={stock === 0}>
        Agregar
      </button>
    </div>
  );
}
