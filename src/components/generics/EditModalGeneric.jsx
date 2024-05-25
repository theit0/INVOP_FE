import React, { useState } from 'react';
import '../../components/edit/editModal/EditModal.css';

const EditModalGeneric = ({ entity, onClose, onUpdate, nonEditableFields, relatedData }) => {
  const [formValues, setFormValues] = useState({ ...entity });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formValues);
  };

  const renderInputField = (field) => {
    if (nonEditableFields.includes(field)) {
      return <input type="text" name={field} value={formValues[field]} readOnly />;
    }

    if (field === 'proveedor_determinado_id') {
      return (
        <select name={field} value={formValues[field]} onChange={handleChange}>
          {relatedData.proveedores.map(proveedor => (
            <option key={proveedor.id} value={proveedor.id}>{proveedor.nombre}</option>
          ))}
        </select>
      );
    }

    if (field === 'familia_articulo_id') {
      return (
        <select name={field} value={formValues[field]} onChange={handleChange}>
          {relatedData.familias.map(familia => (
            <option key={familia.id} value={familia.id}>{familia.nombre}</option>
          ))}
        </select>
      );
    }

    return <input type="text" name={field} value={formValues[field]} onChange={handleChange} />;
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar {entity.nombre}</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(formValues).map(field => (
            <div key={field}>
              <label>{field}</label>
              {renderInputField(field)}
            </div>
          ))}
          <div className="modal-actions">
            <button type="submit">Confirmar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModalGeneric;
