import React, { useState, useEffect } from 'react';
import '../../components/edit/editModal/EditModal.css';

const EditModalGeneric = ({ entity, onClose, onUpdate, nonEditableFields, relatedData }) => {
  const [formValues, setFormValues] = useState({ ...entity });

  useEffect(() => {
    setFormValues({ ...entity });
  }, [entity]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is a related field and handle it accordingly
    if (relatedData[name]) {
      const selectedItem = relatedData[name].find(item => item.id.toString() === value);
      setFormValues({ ...formValues, [name]: selectedItem });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formValues);
  };

  const renderInputField = (field) => {
    if (nonEditableFields.includes(field)) {
      return <input type="text" name={field} value={formValues[field]} readOnly />;
    }

    if (relatedData[field]) {
      const relatedItems = relatedData[field];
      const selectedValue = formValues[field]?.id || '';

      return (
        <select name={field} value={selectedValue} onChange={handleChange}>
          {relatedItems.map(item => (
            <option key={item.id} value={item.id}>{item.nombre}</option>
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
