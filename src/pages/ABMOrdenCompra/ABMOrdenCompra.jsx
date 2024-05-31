import CambiarEstadoButton from "../../components/edit/editButton/CambiarEstadoButton";
import ABMEntity from "../../gen/ABMEntity";
import Swal from "sweetalert2";

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
  ];

  const handleChangeEstado = async (entity) => {

    const estadoActual = entity.estadoOrdenCompra.nombre;

    console.log(entity)

    

    const entityToSend = {
      "id": entity.id,
      "montoTotal":entity.montoTotal,
      "cantidad":entity.cantidad,
      "estadoOrdenCompra":entity.estadoOrdenCompra,
      "articulo":entity.articulo,
      "proveedor":entity.articulo
    }
    
    if (estadoActual === "Pendiente") {
      Swal.fire({
        text: "El estado de la compra es Pendiente, no se puede cambiar a En curso.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
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

      Swal.fire({
        text: `El estado se cambió a enviada correctamente.`,
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      
    } catch (error) {
      console.error(error);
      Swal.fire({
        text: 'Hubo un error al cambiar el estado.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  const renderOrdenCompraActions = (entity) => (
    <CambiarEstadoButton onClick={() => handleChangeEstado(entity)}/>
  );

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
      />
    </div>
  );
};

export default ABMOrdenCompra;
