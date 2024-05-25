import React, { useState } from 'react';
import './EditModal.css';

const EditModal = ({ articulo, onClose, onUpdate, proveedoresDeterminados, familiasArticulo }) => {
  const [formValues, setFormValues] = useState({ ...articulo });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formValues);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Artículo</h2>
        <form onSubmit={handleSubmit}>
          <label>ID</label>
          <input type="text" name="id" value={formValues.id} readOnly />
          <label>Fecha Alta</label>
          <input type="date" name="fecha_alta" value={formValues.fecha_alta} readOnly />
          <label>Fecha Baja</label>
          <input type="date" name="fecha_baja" value={formValues.fecha_baja || ''} onChange={handleChange} />
          <label>Fecha Modificación</label>
          <input type="date" name="fecha_modificacion" value={formValues.fecha_modificacion} onChange={handleChange} />
          <label>CGI</label>
          <input type="number" name="cgi" value={formValues.cgi} onChange={handleChange} />
          <label>Descripción</label>
          <input type="text" name="descripcion" value={formValues.descripcion} onChange={handleChange} />
          <label>Nombre</label>
          <input type="text" name="nombre" value={formValues.nombre} onChange={handleChange} />
          <label>Stock Actual</label>
          <input type="number" name="stock_actual" value={formValues.stock_actual} onChange={handleChange} />
          
          <label>Proveedor Determinado</label>
          <select name="proveedor_determinado_id" value={formValues.proveedor_determinado_id} onChange={handleChange}>
            {proveedoresDeterminados.map(proveedor => (
              <option key={proveedor.id} value={proveedor.id}>{proveedor.nombre}</option>
            ))}
          </select>

          <label>Familia Artículo</label>
          <select name="familia_articulo_id" value={formValues.familia_articulo_id} onChange={handleChange}>
            {familiasArticulo.map(familia => (
              <option key={familia.id} value={familia.id}>{familia.nombre}</option>
            ))}
          </select>

          <label>Modelo Inventario ID</label>
          <input type="number" name="modelo_inventario_id" value={formValues.modelo_inventario_id} onChange={handleChange}readOnly />
          <label>Lote Óptimo</label>
          <input type="number" name="lote_optimo" value={formValues.lote_optimo} onChange={handleChange}readOnly />
          <label>Punto Pedido</label>
          <input type="number" name="punto_pedido" value={formValues.punto_pedido} onChange={handleChange}readOnly />
          <label>Stock Seguridad</label>
          <input type="number" name="stock_seguridad" value={formValues.stock_seguridad} onChange={handleChange} readOnly/>
          <div className="modal-actions">
            <button type="submit">Confirmar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
