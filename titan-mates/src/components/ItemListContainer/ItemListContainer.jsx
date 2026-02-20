import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config.js";
import ItemList from "../ItemList/ItemList";

export default function ItemListContainer({ greeting }) {
  const { categoryId } = useParams();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const colRef = collection(db, "products");
    const q = categoryId ? query(colRef, where("category", "==", categoryId)) : colRef;

    getDocs(q)
      .then((snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setItems(data);
      })
      .catch((err) => {
        console.error("Error getDocs:", err);
        setItems([]);
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