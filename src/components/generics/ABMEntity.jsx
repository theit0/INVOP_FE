import React, { useState, useEffect } from 'react';
import { CgAdd } from "react-icons/cg";
import DeleteButton from "../../components/delete/deleteButton/DeleteButton";
import EditButton from "../../components/edit/editButton/EditButton";
import EditModalGeneric from './EditModalGeneric';

const ABMEntity = ({ entityName, apiUrl, columns, nonEditableFields }) => {
  const [entities, setEntities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [relatedData, setRelatedData] = useState({});

  useEffect(() => {
    fetchEntities();
  }, []);

  const fetchEntities = async () => {
    const response = await fetch(`${apiUrl}/${entityName}`);
    const data = await response.json();
    setEntities(data);

    // Fetch related data for dropdowns if necessary
    if (entityName === 'articulo') {
      const [proveedores, familias] = await Promise.all([
        fetch(`${apiUrl}/proveedor`).then(res => res.json()),
        fetch(`${apiUrl}/familia`).then(res => res.json()),
      ]);
      setRelatedData({ proveedores, familias });
    }
    console.log(data)
  };

  const handleEditClick = (entity) => {
    setSelectedEntity(entity);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEntity(null);
  };

  const handleUpdateEntity = (updatedEntity) => {
    setEntities(entities.map(entity => 
      entity.id === updatedEntity.id ? updatedEntity : entity
    ));
    handleModalClose();
  };

  const getColumnValue = (entity, column) => {
    if (typeof entity[column] === 'object' && entity[column] !== null) {
      return entity[column].nombre || entity[column].id || '';
    }
    if(entity[column]===null || entity[column]===null){
        return "-"
    }
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
