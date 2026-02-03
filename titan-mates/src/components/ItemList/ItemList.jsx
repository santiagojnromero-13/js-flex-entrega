import Item from "../Item/Item";

export default function ItemList({ items }) {
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        marginTop: 12,
      }}
    >
      {items.map((p) => (
        <Item key={p.id} {...p} />
      ))}
    </div>
  );
}
