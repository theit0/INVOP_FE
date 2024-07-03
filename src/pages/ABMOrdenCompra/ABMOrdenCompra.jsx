import { useEffect, useState } from "react";
import CambiarEstadoButton from "../../components/edit/editButton/CambiarEstadoButton";
import ABMEntity from "../../gen/ABMEntity";
import Swal from "sweetalert2";
import ConfirmChangeStateModal from "../../components/edit/editButton/ConfirmChangeStateModal";
import { fetchEntities } from "../../services/entityService";

const ABMOrdenCompra = () => {
  

  const apiUrl = "http://localhost:8080";
  const entityName = "ordencompra";
  const columns = [
    "id",
    "fechaAlta",
    "cantidad",
    "fechaLlegada",
    "montoTotal",
    "articulo",
    "estadoOrdenCompra",
    "proveedor",
  ];


  const relatedObjects = [
    { apiName: "articulo", fieldName: "articulo" },
    { apiName: "proveedor", fieldName: "proveedor" },
    { apiName: "estadoOC", fieldName: "estadoOrdenCompra" },
  ];

  const createExcludedFields = [
    "id",
    "fechaAlta",
    "fechaBaja",
    "fechaModificacion",
    "fechaLlegada",
    "montoTotal",
    "estadoOrdenCompra",
    "proveedor",
  ];

  const nonEditableFields = [
    "id",
    "fechaAlta",
    "fechaBaja",
    "fechaModificacion",
    "fechaCreacion",
    "articulo",
    "montoTotal",
    "estadoOrdenCompra",
    "fechaLlegada",
  ];
  

  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [isChangeStateModalOpen, setIsChangeStateModalOpen] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    const fetchedEntities = await fetchEntities(apiUrl, entityName);
    setEntities(fetchedEntities);
  };

  const handleChangeEstadoClick = (entity) => {
    setSelectedEntity(entity);
    setIsChangeStateModalOpen(true);
  };

  const handleModalClose = () => {
    setIsChangeStateModalOpen(false);
    setSelectedEntity(null);
  };

  const handleChangeEstado = async (entity) => {

    const estadoActual = entity.estadoOrdenCompra.nombre;

    const entityToSend = {
      "id": entity.id,
      "montoTotal":entity.montoTotal,
      "cantidad":entity.cantidad,
      "estadoOrdenCompra":entity.estadoOrdenCompra,
      "articulo":entity.articulo,
      "proveedor":entity.proveedor
    }
    
    if (estadoActual === "Pendiente") {
      Swal.fire({
          text: 'El estado de la compra es "Pendiente". No se puede cambiar a "En curso".',
          background:"black",
          color:"white",
          padding:"1rem 2rem",
          icon: "warning",
          toast:true,
          timer:2000,
          position: "top",
          showConfirmButton:false
      })
      setIsChangeStateModalOpen(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/ordencompra/cambioEstado/3`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entityToSend),
      });

      if (!response.ok) {
        throw new Error('Error al cambiar el estado');
      }
      setIsChangeStateModalOpen(false);
      Swal.fire({
          text: `El estado se cambió a "Enviada" correctamente.`,
          background:"black",
          color:"white",
          padding:"1rem 2rem",
          icon: "success",
          toast:true,
          timer:2000,
          position: "top",
          showConfirmButton:false
      })
      // Fetch the updated list of entities and update the state
      const updatedEntities = await fetchEntities(apiUrl, entityName);
      setEntities(updatedEntities);
    } catch (error) {
      console.error(error);
      Swal.fire({
        text: 'Hubo un error al cambiar el estado.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        position: "top",
      });
    }
  };

  const renderOrdenCompraActions = (entity) => {
    const estadoActual = entity.estadoOrdenCompra.nombre;
    const isDisabled = estadoActual === "Enviada";
    return (
      <CambiarEstadoButton 
        onClick={() => handleChangeEstadoClick(entity)}
        disabled={isDisabled}
      />
    );
  };



  return (
    <div>
      <ABMEntity
        entityName={entityName}
        apiUrl={apiUrl}
        columns={columns}
        relatedObjects={relatedObjects}
        nonEditableFields={nonEditableFields}
        createExcludedFields={createExcludedFields}
        renderActions={renderOrdenCompraActions}
        objects={entities}
      />
      {isChangeStateModalOpen && (
        <ConfirmChangeStateModal
          entity={selectedEntity}
          onClose={handleModalClose}
          onUpdate={handleChangeEstado}
        />
      )}
    </div>
  );
};

export default ABMOrdenCompra;
