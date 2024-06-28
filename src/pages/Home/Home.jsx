import { Link } from "react-router-dom";
import "./Home.css";
import LogoInvop from "../../assets/LOGO_INVOP.png"
const Home = () => {
  return (
    <main>
      <h4>GRUPO NRO. 6</h4>
      <h1>PROYECTO INVESTIGACIÓN OPERATIVA</h1>
      <p>Prototipo de
aplicación cuyo objetivo es el manejo de inventarios y pronósticos, junto con las funciones
necesarias para el correcto funcionamiento de un sistema de Gestión de Inventarios de una
empresa de comercio minorista.</p>
      <div className="container-home">
        <div className="module">
          <h3>Maestro Artículos</h3>
          <Link to="/abm-articulos">ABM Articulos</Link>
          <Link to="/abm-proveedores">ABM Proveedores</Link>
          <Link to="/abm-familia-articulo">ABM Familia Articulo</Link>
        </div>
        <div className="module">
          <h3>Inventario</h3>
          <Link to="/listar-articulos">Listar articulos</Link>
          <Link to="/abm-ordencompra">ABM Orden compra</Link>
        </div>
        <div className="module">
          <h3>Demanda</h3>
          <Link to="/prediccion-demanda">Predecir demanda</Link>
          <Link to="/abm-ventas">ABM Ventas</Link>
          <Link to="/abm-parametros">ABM Parametros</Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
