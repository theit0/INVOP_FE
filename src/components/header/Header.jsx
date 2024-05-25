import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <header>
      <h2>Proyecto INV</h2>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/abm-articulos">ABM Articulos</Link>
      </nav>
    </header>
  );
};

export default Header;
