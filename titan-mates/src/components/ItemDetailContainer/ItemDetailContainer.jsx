import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../data/products";
import ItemDetail from "../ItemDetail/ItemDetail";

export default function ItemDetailContainer() {
  const { itemId } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProductById = (id) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const found = products.find((p) => p.id === id);
        found ? resolve(found) : reject("No existe");
      }, 500);
    });

  useEffect(() => {
    setLoading(true);

    getProductById(itemId)
      .then(setItem)
      .catch(() => setItem(null))
      .finally(() => setLoading(false));
  }, [itemId]);

  if (loading) return <p style={{ padding: 12 }}>Cargando...</p>;
  if (!item) return <p style={{ padding: 12 }}>Producto no encontrado</p>;

  return <ItemDetail item={item} />;
}
