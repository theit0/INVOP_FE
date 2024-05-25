import Header from "./components/header/Header";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ABMArticulos from "./pages/ABMArticulos/ABMArticulos";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router } from "react-router-dom";
import ABMArticulosPrueba from "./pages/ABMArticulos/ABMArticulosPrueba";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/abm-articulos" element={<ABMArticulosPrueba />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
