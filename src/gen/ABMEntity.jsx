import React, { useState, useEffect } from 'react';

import DeleteButton from "../components/delete/deleteButton/DeleteButton";
import EditButton from "../components/edit/editButton/EditButton";
import EditModalGeneric from './EditModalGeneric';
import CreateModalGeneric from './CreateModalGeneric';
import DeleteModalGeneric from './DeleteModalGeneric';
import CreateButton from '../components/create/createButton/CreateButton';

import {
    fetchEntities,
    fetchRelatedData,
    updateEntity,
    createEntity,
    deleteEntity
} from '../services/entityService';

import { getColumnValue } from '../utils/entityUtils';

const ABMEntity = ({ entityName, apiUrl, columns, nonEditableFields, relatedObjects, extraDataFetch, createExcludedFields }) => {

    /* Donde almacenamos todos los objetos de la entidad pasada como parametro */
    const [entities, setEntities] = useState([]);

    /* Variable de estado que usamos para cerrar o abrir el modal */
    const [isModalOpen, setIsModalOpen] = useState(false);

    /* Variable de estado que usamos para seleccionar el objeto el cual queremos editar y se lo pasamos al modal */
    const [selectedEntity, setSelectedEntity] = useState(null);

    /* Son los que capaz necesitamos para poder hacer un dropdown en los modales, ya que necesitamos tener todo para seleccionar uno */
    const [relatedData, setRelatedData] = useState({});

    /* Manejar la visibilidad del modal de create  */
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    /* Manejar la visibilidad del modal de delete  */
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [entityToDelete, setEntityToDelete] = useState(null);

    /* Porción de codigo que se va a ejecutar cuando se monte el componente, en este caso fetchEntities */
    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        const entities = await fetchEntities(apiUrl, entityName, extraDataFetch);
        setEntities(entities);

        const relatedData = await fetchRelatedData(apiUrl, relatedObjects);
        setRelatedData(relatedData);
    };

    /* Manejamos el modal de edición */
    const handleEditClick = (entity) => {
        setSelectedEntity(entity);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedEntity(null);
    };

    /* Función que se ejecuta cuando confirmamos la modificación */
    const handleUpdateEntity = async (updatedEntity) => {
        try {
            await updateEntity(apiUrl, entityName, updatedEntity);
            setEntities(entities.map(entity => entity.id === updatedEntity.id ? updatedEntity : entity));
            handleModalClose();
        } catch (error) {
            console.error(error.message);
        }
    };

    /* Creamos un objeto */
    const handleCreateEntity = async (newEntity) => {
        try {
            const createdEntity = await createEntity(apiUrl, entityName, newEntity);
            setEntities([...entities, createdEntity]);
            handleCreateModalClose();
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleCreateClick = () => {
        setIsCreateModalOpen(true);
    };

    const handleCreateModalClose = () => {
        setIsCreateModalOpen(false);
    };

    /* Eliminamos un objeto */
    const handleDeleteEntity = async (id) => {
        try {
            await deleteEntity(apiUrl, entityName, id);
            setEntities(entities.filter(entity => entity.id !== id));
            handleDeleteModalClose();
        } catch (error) {
            console.error(error.message);
            handleDeleteModalClose();
        }
    };

    const handleDeleteClick = (entity) => {
        setEntityToDelete(entity);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
        setEntityToDelete(null);
    };

    return (
        <section className="abm-entity">
            <div className='abm-title'>
                <h1>ABM {entityName}</h1>
                <p>Consultar, modificar, crear y eliminar {entityName}.</p>
            </div>

            <CreateButton onClick={handleCreateClick} entityName={entityName} />

            <table className="entity-table">
                <thead>
                    <tr>
                        {columns.map(column => (
                            <th key={column}>{column}</th>
                        ))}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {entities.map((entity) => (
                        <tr key={entity.id}>
                            {columns.map(column => (
                                <td key={column}>{getColumnValue(entity, column)}</td>
                            ))}
                            <td className='action-btns'>
                                <EditButton onClick={() => handleEditClick(entity)} />
                                <DeleteButton onClick={() => handleDeleteClick(entity)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <EditModalGeneric
                    entity={selectedEntity}
                    onClose={handleModalClose}
                    onUpdate={handleUpdateEntity}
                    nonEditableFields={nonEditableFields}
                    relatedData={relatedData}
                />
            )}

            {isCreateModalOpen && (
                <CreateModalGeneric
                    onClose={handleCreateModalClose}
                    onCreate={handleCreateEntity}
                    relatedData={relatedData}
                    columns={columns}
                    createExcludedFields={createExcludedFields}
                />
            )}

            {isDeleteModalOpen && (
                <DeleteModalGeneric
                    onClose={handleDeleteModalClose}
                    onDelete={handleDeleteEntity}
                    entity={entityToDelete}
                />
            )}
        </section>
    );
};

export default ABMEntity;