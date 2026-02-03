import { Link, NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";

const categories = [
  { id: "mates", label: "Mates" },
  { id: "bombillas", label: "Bombillas" },
  { id: "termos", label: "Termos" },
];

export default function NavBar() {
  return (
    <header style={{ padding: 12, borderBottom: "1px solid #ddd", display: "flex", gap: 16 }}>
      <Link to="/" style={{ fontWeight: 800, textDecoration: "none" }}>
        Titan Mates
      </Link>

      <nav style={{ display: "flex", gap: 12 }}>
        {categories.map((c) => (
          <NavLink
            key={c.id}
            to={`/category/${c.id}`}
            style={({ isActive }) => ({
              textDecoration: "none",
              fontWeight: isActive ? 800 : 400,
            })}
          >
            {c.label}
          </NavLink>
        ))}
      </nav>

      <div style={{ marginLeft: "auto" }}>
        <CartWidget />
      </div>
    </header>
  );
}
