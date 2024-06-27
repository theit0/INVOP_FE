import React, { useState, useEffect } from 'react';
import "../components/modal/Modal.css";
import { CgAdd } from 'react-icons/cg';

const EditModalGeneric = ({ 
    entity, 
    onClose, 
    onUpdate, 
    nonEditableFields, 
    relatedObjects, 
    subEntityHandlers 
}) => {
    const [formValues, setFormValues] = useState({ ...entity });
    const [isAddSubEntityModalOpen, setIsAddSubEntityModalOpen] = useState(false);

    useEffect(() => {
        setFormValues({ ...entity });
    }, [entity]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (relatedObjects[name]) {
            const selectedItem = relatedObjects[name].find(item => item.id.toString() === value);
            setFormValues({ ...formValues, [name]: selectedItem });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    const handleAddSubEntity = async (subEntity) => {
        await subEntityHandlers.addSubEntity(formValues, subEntity);
        setFormValues(prevFormValues => ({
            ...prevFormValues,
            [subEntityHandlers.subEntityField]: [...prevFormValues[subEntityHandlers.subEntityField], subEntity]
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

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formValues);
    };

    const renderInputField = (field) => {
        if (nonEditableFields.includes(field)) {
            return null;
        }
        if (relatedObjects[field]) {
            const relatedItems = relatedObjects[field];
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
                        !nonEditableFields.includes(field) && (
                            <div key={field}>
                                <label className="modal-label">{field}</label>
                                {renderInputField(field)}
                            </div>
                        )
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
                                    { formValues[subEntityHandlers.subEntityField]?.map((subEntity, index) => (
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

export default EditModalGeneric;
