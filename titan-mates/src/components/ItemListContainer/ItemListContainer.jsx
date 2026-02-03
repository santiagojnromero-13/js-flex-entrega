import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../data/products";
import ItemList from "../ItemList/ItemList";

export default function ItemListContainer({ greeting }) {
  const { categoryId } = useParams();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(products), 500);
    });

  useEffect(() => {
    setLoading(true);

    getProducts()
      .then((data) => {
        const filtered = categoryId ? data.filter((p) => p.category === categoryId) : data;
        setItems(filtered);
      })
      .finally(() => setLoading(false));
  }, [categoryId]);

  return (
    <main style={{ padding: 12 }}>
      <h2>{categoryId ? `Categoría: ${categoryId}` : greeting}</h2>
      {loading ? <p>Cargando...</p> : <ItemList items={items} />}
    </main>
  );
}
