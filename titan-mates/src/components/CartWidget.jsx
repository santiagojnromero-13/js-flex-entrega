const CartWidget = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ fontSize: "22px" }}>🛒</span>

      <span
        style={{
          backgroundColor: "black",
          color: "white",
          borderRadius: "50%",
          padding: "4px 8px",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        0
      </span>
    </div>
  );
};

export default CartWidget;

