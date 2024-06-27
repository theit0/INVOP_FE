import React, { useState } from 'react';
import "../components/modal/Modal.css";
import { CgAdd } from 'react-icons/cg';

const CreateModalGeneric = ({ 
    onClose, 
    onCreate, 
    relatedData, 
    columns, 
    createExcludedFields, 
    subEntityHandlers 
}) => {
    const [isAddSubEntityModalOpen, setIsAddSubEntityModalOpen] = useState(false);
    const [formValues, setFormValues] = useState(
        columns.reduce((acc, column) => {
            acc[column] = column === subEntityHandlers?.subEntityField ? [] : '';
            return acc;
        }, {})
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

    const handleAddSubEntity = async (subEntity) => {
        await subEntityHandlers.addSubEntity(formValues, subEntity);
        setFormValues(prevFormValues => ({
            ...prevFormValues,
            [subEntityHandlers.subEntityField]: [...(prevFormValues[subEntityHandlers.subEntityField] || []), subEntity]
        }));
        setIsAddSubEntityModalOpen(false);
    };

    const handleRemoveSubEntity = async (index) => {
        await subEntityHandlers.removeSubEntity(formValues, index);
        setFormValues(prevFormValues => ({
            ...prevFormValues,
            [subEntityHandlers.subEntityField]: prevFormValues[subEntityHandlers.subEntityField].filter((_, i) => i !== index)
        }));
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
                    {subEntityHandlers && (
                        <>
                            <div>
                                <button type="button" onClick={() => setIsAddSubEntityModalOpen(true)} className='add-demora-button'><CgAdd />Agregar {subEntityHandlers.subEntityField}</button>
                            </div>
                            <div>
                                <table className="entity-table">
                                    <thead>
                                        <tr>
                                            {Object.keys(subEntityHandlers.subEntityComponent.fields).map((field, index) => (
                                                <th key={index}>{subEntityHandlers.subEntityComponent.fields[field]}</th>
                                            ))}
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formValues[subEntityHandlers.subEntityField]?.map((subEntity, index) => (
                                            <tr key={index}>
                                                {Object.keys(subEntityHandlers.subEntityComponent.fields).map((field, subIndex) => (
                                                    <td key={subIndex}>{typeof subEntity[field] === 'object' ? subEntity[field].nombre : subEntity[field]}</td>
                                                ))}
                                                <td>
                                                    <button type="button" onClick={() => handleRemoveSubEntity(index)} className="btn-accion">Eliminar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                    <div className="modal-actions">
                        <button type="submit">Confirmar</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
            {isAddSubEntityModalOpen && subEntityHandlers && (
                <subEntityHandlers.subEntityComponent.component
                    onClose={() => setIsAddSubEntityModalOpen(false)} 
                    onSave={handleAddSubEntity}
                    subEntityApiName={subEntityHandlers.subEntityComponent.subEntityApiName}
                />
            )}
        </div>
    );
};

export default CreateModalGeneric;
