import React, { useState } from 'react';
import "./ABMArticulos.css";
import { CgAdd } from "react-icons/cg";
import DeleteButton from "../../components/delete/deleteButton/DeleteButton";
import EditButton from "../../components/edit/editButton/EditButton";
import EditModal from "../../components/edit/editModal/EditModal";

const ABMArticulos = () => {

  //Conjunto de articulos
  const [articulos, setArticulos] = useState([
    {
      id: 1,
      fecha_alta: "2023-01-01",
      fecha_baja: null,
      fecha_modificacion: "2023-01-10",
      cgi: 12345,
      descripcion: "Descripción del artículo 1",
      nombre: "Artículo 1",
      stock_actual: 100,
      familia_articulo_id: 10,
      proveedor_determinado_id: 5,
      modelo_inventario_id: 3,
      lote_optimo: 50,
      punto_pedido: 20,
      stock_seguridad: 10,
    },
    {
      id: 2,
      fecha_alta: "2023-02-01",
      fecha_baja: null,
      fecha_modificacion: "2023-02-15",
      cgi: 67890,
      descripcion: "Descripción del artículo 2",
      nombre: "Artículo 2",
      stock_actual: 50,
      familia_articulo_id: 20,
      proveedor_determinado_id: 10,
      modelo_inventario_id: 4,
      lote_optimo: 30,
      punto_pedido: 15,
      stock_seguridad: 5,
    },
  ]);

  //Ejemplos proveedores
  const proveedoresDeterminados = [
    { id: 1, nombre: 'Proveedor 1' },
    { id: 2, nombre: 'Proveedor 2' },
  ];

  //Ejemplos familias
  const familiasArticulo = [
    { id: 10, nombre: 'Familia 1' },
    { id: 20, nombre: 'Familia 2' },
  ];


  //Para manejar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Para almacenar el articulo el cual queremos editar
  const [selectedArticulo, setSelectedArticulo] = useState(null);

  //Se ejecuta cuando clickeo en el lapizito
  const handleEditClick = (articulo) => {
    setSelectedArticulo(articulo);
    setIsModalOpen(true);
  };

  //Se ejecuta cuando se clickea en cancelar
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedArticulo(null);
  };

  //Se ejecuta cuando se clickea en confirmar
  const handleUpdateArticulo = (updatedArticulo) => {
    setArticulos(articulos.map(articulo => 
      articulo.id === updatedArticulo.id ? updatedArticulo : articulo
    ));
    handleModalClose();
  };

  return (
    <section className="abm-articulos">
      <div>
        <h1>ABM Articulos</h1>
        <p>Consultar, modificar, crear y eliminar artículos.</p>
      </div>

      <button className="crear-articulo">
        <CgAdd />
        Crear artículo
      </button>

      <table className="articulos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha Alta</th>
            <th>Fecha Baja</th>
            <th>Fecha Modificación</th>
            <th>CGI</th>
            <th>Descripción</th>
            <th>Nombre</th>
            <th>Stock Actual</th>
            <th>Familia Artículo ID</th>
            <th>Proveedor Determinado ID</th>
            <th>Modelo Inventario ID</th>
            <th>Lote Óptimo</th>
            <th>Punto Pedido</th>
            <th>Stock Seguridad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {articulos.map((articulo) => (
            <tr key={articulo.id}>
              <td>{articulo.id}</td>
              <td>{articulo.fecha_alta}</td>
              <td>{articulo.fecha_baja ? articulo.fecha_baja : '-'}</td>
              <td>{articulo.fecha_modificacion}</td>
              <td>{articulo.cgi}</td>
              <td>{articulo.descripcion}</td>
              <td>{articulo.nombre}</td>
              <td>{articulo.stock_actual}</td>
              <td>{articulo.familia_articulo_id}</td>
              <td>{articulo.proveedor_determinado_id}</td>
              <td>{articulo.modelo_inventario_id}</td>
              <td>{articulo.lote_optimo}</td>
              <td>{articulo.punto_pedido}</td>
              <td>{articulo.stock_seguridad}</td>
              <td style={{"display":"flex", "gap":"1rem","justifyContent":"center"}}>
                <EditButton onClick={() => handleEditClick(articulo)} />
                <DeleteButton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <EditModal
          articulo={selectedArticulo}
          onClose={handleModalClose}
          onUpdate={handleUpdateArticulo}
          proveedoresDeterminados={proveedoresDeterminados} //Esto no va a hacer falta cuando tengamos los datos de api, ya que viene con articulo
          familiasArticulo={familiasArticulo} //Esto no va a hacer falta cuando tengamos los datos de api, ya que viene con articulo
        />
      )}
    </section>
  );
};

export default ABMArticulos;
