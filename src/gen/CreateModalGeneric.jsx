import React, { useState } from 'react';
import "../components/edit/editModal/EditModal.css";

const CreateModalGeneric = ({ onClose, onCreate, relatedData, columns, createExcludedFields }) => {
    const [formValues, setFormValues] = useState(
        columns.reduce((acc, column) => ({ ...acc, [column]: '' }), {})
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (relatedData[name]) {
            const selectedItem = relatedData[name].find(item => item.id.toString() === value);
            setFormValues({ ...formValues, [name]: selectedItem });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleanedFormValues = Object.fromEntries(
            Object.entries(formValues).map(([key, value]) => [key, value === '' ? null : value])
        );
        onCreate(cleanedFormValues);
    };

    const renderInputField = (field) => {
        if (relatedData[field]) {
            const relatedItems = relatedData[field];
            const selectedValue = formValues[field]?.id || '';

            return (
                <select name={field} value={selectedValue} onChange={handleChange}>
                    <option value="">Seleccione {field}</option>
                    {relatedItems.map(item => (
                        <option key={item.id} value={item.id}>{item.nombre}</option>
                    ))}
                </select>
            );
        }

        return <input type="text" name={field} value={formValues[field] || ''} onChange={handleChange} />;
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Crear Nueva Entidad</h2>
                <form onSubmit={handleSubmit}>
                    {columns.filter(column => !createExcludedFields.includes(column)).map(field => (
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

export default CreateModalGeneric;
