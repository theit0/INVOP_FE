import { Link } from "react-router-dom";
import "./Header.css";
import Dropdown from 'react-bootstrap/Dropdown';
import HomeSvg from "../icons/HomeSvg";
import ArticulosSvg from "../icons/ArticulosSvg";
import InventarioSvg from "../icons/InventarioSvg";
import DemandaSvg from "../icons/DemandaSvg";
import LogoInvop from "../../assets/LOGO_INVOP.png"
const Header = () => {
  return (
    <header>
      <Link to={'/'}>
          <img src={LogoInvop} alt="logo" width={150}/>
      </Link>
      
      <nav>
        
        
        
        <Link to="/" className="home-anchor">
          <HomeSvg/>
          Home
        </Link>


        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" >
            <ArticulosSvg/>
            Maestro articulos
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
                <Link to="/abm-articulos">ABM Articulos</Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <Link to="/abm-proveedores">ABM Proveedores</Link>
            </Dropdown.Item>
            <Dropdown.Item >
                <Link to="/abm-familia-articulo">ABM Familia Articulo</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <InventarioSvg/>
            Inventario
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/listar-articulos">Listar articulos</Link>
            </Dropdown.Item>
            <Dropdown.Item >
                <Link to="/abm-ordencompra">ABM Orden compra</Link>
            </Dropdown.Item>
            <Dropdown.Item >
                  <Link Link to="/abm-artdatomodeloart">ABM Articulo Dato Modelo</Link>
            </Dropdown.Item>
            
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <DemandaSvg/>
            Demanda
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
                <Link Link to="/prediccion-demanda">Predecir demanda</Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <Link to="/abm-ventas">ABM Ventas</Link>
            </Dropdown.Item>
            <Dropdown.Item >
                <Link to="/abm-parametros">ABM Parametros</Link>
            </Dropdown.Item>
          </Dropdown.Menu>

        </Dropdown>
        
        
        
        
      </nav>
    </header>
  );
};

export default Header;
