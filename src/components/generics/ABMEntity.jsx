import React, { useState, useEffect } from 'react';
import { CgAdd } from "react-icons/cg";
import DeleteButton from "../delete/deleteButton/DeleteButton";
import EditButton from "../edit/editButton/EditButton";
import EditModalGeneric from './EditModalGeneric';

const ABMEntity = ({ entityName, apiUrl, columns, nonEditableFields, relatedObjects, extraDataFetch }) => {

    /* Donde almacenamos todos los objetos de la entidad pasada como parametro */
    const [entities, setEntities] = useState([]);

    /* Variable de estado que usamos para cerrar o abrir el modal */
    const [isModalOpen, setIsModalOpen] = useState(false);

    /* Variable de estado que usamos para seleccionar el objeto el cual queremos editar y se lo pasamos al modal */
    const [selectedEntity, setSelectedEntity] = useState(null);

    /* Son los que capaz necesitamos para poder hacer un dropdown en los modales, ya que necesitamos tener todo para seleccionar uno */
    const [relatedData, setRelatedData] = useState({});

    /* Porción de codigo que se va a ejecutar cuando se monte el componente, en este caso fetchEntities */
    useEffect(() => {
      fetchEntities();
    }, []);

    /* Función en la cual obtenemos todos los datos */
    const fetchEntities = async () => {

    /* Hacemos getAll a la entidad pasada por param. */
    const response = await fetch(`${apiUrl}/${entityName}`);
    const data = await response.json();

    /* Función para extraer datos adicionales. Ej: datos de un DTO */
    if (extraDataFetch) {
      const entitiesWithExtraData = await extraDataFetch(data);
      setEntities(entitiesWithExtraData);
    } else {
      setEntities(data);
    }

    /* Llamamos a la funcion fetchRelatedData */
    fetchRelatedData(data);
  };

  /* Le hacemos getAll a los datos adicionales que necesitemos de otras entidades */
  const fetchRelatedData = async (entities) => {
    /* Extraemos la info de cada uno de los objetos de los que queremos la info y la guardamos */
    const relatedPromises = relatedObjects.map(async obj => {
      const response = await fetch(`${apiUrl}/${obj.apiName}`);
      const data = await response.json();
      return { [obj.fieldName]: data };
    });
    /* Esperamos a la API a que responda */
    const relatedResults = await Promise.all(relatedPromises);

    const relatedData = relatedResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});
    setRelatedData(relatedData);
  };

  /* Manejamos el modal */
  const handleEditClick = (entity) => {
    setSelectedEntity(entity);
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEntity(null);
  };

  /* Funcion que se ejecuta cuando confirmamos la modificacion */
  const handleUpdateEntity = (updatedEntity) => {
    setEntities(entities.map(entity => 
      entity.id === updatedEntity.id ? updatedEntity : entity
    ));
    handleModalClose();
  };

  /* Obtenemos la informacion de una atributo */
  const getColumnValue = (entity, column) => {
      /* Si el atributo es un objeto obtenemos el nombre de este */
      if (typeof entity[column] === 'object' && entity[column] !== null) {
        return entity[column].nombre || entity[column].id || '';
      }
      /* Si es undefined o null asignamos "-" */
      if (entity[column] === null || entity[column] === undefined) {
        return "-";
      }
      /* Si no es ninguna de las anteriores retornamos su valor normal */
      return entity[column];
  };

  return (
      <section className="abm-entity">
        <div>
          <h1>ABM {entityName}</h1>
          <p>Consultar, modificar, crear y eliminar {entityName}.</p>
        </div>

        <button className="crear-entity">
          <CgAdd />
          Crear {entityName}
        </button>

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
                <td>
                  <EditButton onClick={() => handleEditClick(entity)} />
                  <DeleteButton />
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
      </section>
  );
};

export default ABMEntity;
