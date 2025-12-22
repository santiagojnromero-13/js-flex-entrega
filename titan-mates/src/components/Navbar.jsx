import CartWidget from "./CartWidget";

const NavBar = () => {
  return (
    <header>
      <h2>Titan Dis</h2>

      <nav>
        <a href="#inicio">Inicio</a>
        <a href="#productos">Productos</a>
        <a href="#contacto">Contacto</a>
      </nav>

      <CartWidget />
    </header>
  );
};

export default NavBar;
