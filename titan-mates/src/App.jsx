import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Cart from "./components/Cart/Cart";

export default function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<ItemListContainer greeting="Catálogo" />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />

        {/* ✅ agregar esta ruta */}
        <Route path="/cart" element={<Cart />} />

        <Route
          path="*"
          element={<h2 style={{ padding: 12 }}>404 - Ruta no encontrada</h2>}
        />
      </Routes>
    </>
  );
}