import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config.js";
import ItemDetail from "../ItemDetail/ItemDetail";

export default function ItemDetailContainer() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    const ref = doc(db, "products", itemId);

    getDoc(ref)
      .then((snap) => {
        if (!snap.exists()) {
          setNotFound(true);
          return;
        }
        setItem({ id: snap.id, ...snap.data() });
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [itemId]);

  if (loading) return <p>Cargando detalle...</p>;
  if (notFound) return <Navigate to="/404" replace />;

  return <ItemDetail item={item} />;
}