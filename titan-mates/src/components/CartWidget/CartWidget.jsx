import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function CartWidget() {
  const { totalQuantity } = useContext(CartContext);

  return (
    <span>
      🛒 {totalQuantity > 0 ? totalQuantity : ""}
    </span>
  );
}