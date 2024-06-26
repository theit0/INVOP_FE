import Header from "./components/header/Header";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router } from "react-router-dom";
import ABMArticulos from "./pages/ABMArticulos/ABMArticulos";
import ABMProveedores from "./pages/ABMProveedores/ABMProveedores";
import ABMOrdenCompra from "./pages/ABMOrdenCompra/ABMOrdenCompra";
import ABMParametros from "./pages/ABMParametros/ABMParametros";
import PrediccionDemanda from "./pages/PrediccionDemanda/PrediccionDemanda";
import ABMArticuloDatoModeloArticulo from "./pages/ABMArticuloDatoModeloArticulo/ABMArticuloDatoModeloArticulo";
import ABMFamiliaArticulos from "./pages/ABMFamiliaArticulos/ABMFamiliaArticulos";
import ABMVentas from "./pages/ABMVentas/ABMVentas";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/abm-articulos" element={<ABMArticulos />} />
          <Route path="/abm-artdatomodeloart" element={<ABMArticuloDatoModeloArticulo />} />
          <Route path="/abm-familia-articulo" element={<ABMFamiliaArticulos />} />
          <Route path="/abm-proveedores" element={<ABMProveedores />} />
          <Route path="/abm-ordencompra" element={<ABMOrdenCompra />} />
          <Route path="/abm-parametros" element={<ABMParametros/>}/>
          <Route path="/abm-ventas" element={<ABMVentas/>}/>
          <Route path="/prediccion-demanda" element={<PrediccionDemanda/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
