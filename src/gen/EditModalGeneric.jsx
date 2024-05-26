import React, { useState, useEffect } from 'react';
import "../components/edit/editModal/EditModal.css"
const EditModalGeneric = ({ entity, onClose, onUpdate, nonEditableFields, relatedData }) => {
  
  /* Guardamos el valor de los inputs del form, es decir, el objeto en si*/
  const [formValues, setFormValues] = useState({ ...entity });


  useEffect(() => {
    setFormValues({ ...entity });
  }, [entity]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    /* Checkeamos si clickeo una de las opciones de la lista para poder guardar los cambios en el objeto formValues */
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

  /* Renderizar input */
  const renderInputField = (field) => {
    /* Hacemos que se deshabiliten los inputs que no se pueden modificar  */
    if (nonEditableFields.includes(field)) {
      return <input type="text" name={field} value={formValues[field]} readOnly />;
    }

    /* Si tenemos info relacionada la vamos a obtener y la vamos a desplegar en forma de lista para poder seleccionarla */
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
    /* Renderizamos el input que corresponde al atributo recibido */
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
