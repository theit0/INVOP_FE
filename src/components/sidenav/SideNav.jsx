import { useState } from "react";
import { Link } from "react-router-dom";
import "./SideNav.css";
import Dropdown from 'react-bootstrap/Dropdown';
import Collapse from 'react-bootstrap/Collapse';
import HomeSvg from "../icons/HomeSvg";
import ArticulosSvg from "../icons/ArticulosSvg";
import InventarioSvg from "../icons/InventarioSvg";
import DemandaSvg from "../icons/DemandaSvg";
import LogoInvop from "../../assets/LOGO_INVOP.png";

const SideNav = () => {
  const [isArticulosOpen, setIsArticulosOpen] = useState(false);
  const [isInventarioOpen, setIsInventarioOpen] = useState(false);
  const [isDemandaOpen, setIsDemandaOpen] = useState(false);

  return (
    <div className="side-nav">
      <div className="logo-container">
        <Link to={'/'}>
          <img src={LogoInvop} alt="logo" width={150}/>
        </Link>
      </div>
      

      <nav>
        <Link to="/" className="home-anchor-side">
          <HomeSvg/>
          Home
        </Link>

        <div className="dropdown-full-width">
          <div 
            className="dropdown-toggle-full-width" 
            onClick={() => setIsArticulosOpen(!isArticulosOpen)}
          >
            <ArticulosSvg/>
            Maestro articulos
          </div>
          <Collapse in={isArticulosOpen}>
            <div className="dropdown-menu-full-width">
              <Link to="/abm-articulos" className="dropdown-item">ABM Articulos</Link>
              <Link to="/abm-proveedores" className="dropdown-item">ABM Proveedores</Link>
              <Link to="/abm-familia-articulo" className="dropdown-item">ABM Familia Articulo</Link>
            </div>
          </Collapse>
        </div>

        <div className="dropdown-full-width">
          <div 
            className="dropdown-toggle-full-width" 
            onClick={() => setIsInventarioOpen(!isInventarioOpen)}
          >
            <InventarioSvg/>
            Inventario
          </div>
          <Collapse in={isInventarioOpen}>
            <div className="dropdown-menu-full-width">
              <Link to="/listar-articulos" className="dropdown-item">Listar articulos</Link>
              <Link to="/abm-ordencompra" className="dropdown-item">ABM Orden compra</Link>
              <Link to="/abm-artdatomodeloart" className="dropdown-item">ABM Articulo Dato Modelo</Link>
            </div>
          </Collapse>
        </div>

        <div className="dropdown-full-width">
          <div 
            className="dropdown-toggle-full-width" 
            onClick={() => setIsDemandaOpen(!isDemandaOpen)}
          >
            <DemandaSvg/>
            Demanda
          </div>
          <Collapse in={isDemandaOpen}>
            <div className="dropdown-menu-full-width">
              <Link to="/prediccion-demanda" className="dropdown-item">Predecir demanda</Link>
              <Link to="/abm-ventas" className="dropdown-item">ABM Ventas</Link>
              <Link to="/abm-parametros" className="dropdown-item">ABM Parametros</Link>
            </div>
          </Collapse>
        </div>
      </nav>
    </div>
  );
};

export default SideNav;
