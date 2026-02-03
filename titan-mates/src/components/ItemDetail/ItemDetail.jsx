import ItemCount from "../ItemCount/ItemCount";

export default function ItemDetail({ item }) {
  const onAdd = (qty) => {
    console.log("Agregar al carrito:", { ...item, qty });
  };

  return (
    <section style={{ padding: 12 }}>
      <h2>{item.title}</h2>
      <p>Categoría: {item.category}</p>
      <p>Precio: ${item.price}</p>

      <hr style={{ margin: "16px 0" }} />

      <h4>Unidades</h4>
      <ItemCount stock={10} initial={1} onAdd={onAdd} />
    </section>
  );
}
