import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <header>
      <h2>Proyecto INV</h2>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/abm-articulos">ABM Articulos</Link>
        <Link to="/abm-proveedores">ABM Proveedores</Link>
        <Link to="/abm-familia-articulo">ABM Familia Articulo</Link>
        <Link to="/abm-artdatomodeloart">ABM Articulo Dato Modelo</Link>
        <Link to="/abm-ventas">ABM Ventas</Link>
        <Link to="/abm-ordencompra">ABM Orden compra</Link>
        <Link to="/abm-parametros">ABM Parametros</Link>
        <Link to="/prediccion-demanda">Predecir demanda</Link>
      </nav>
    </header>
  );
};

export default Header;
