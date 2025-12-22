const ItemListContainer = ({ greeting }) => {
  return (
    <main style={{ padding: "24px" }}>
      <h1 style={{ margin: "0 0 10px" }}>{greeting}</h1>
      <p style={{ margin: 0 }}>Acá va a ir el catálogo de productos 🧉</p>
    </main>
  );
};

export default ItemListContainer;
