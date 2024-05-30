import { useState } from "react";
import CalculateButton from "../../components/calculate/CalculateButton";
import ABMEntity from "../../gen/ABMEntity";
import "./ABMArticulos.css"
import Swal from "sweetalert2";
import CalcularCantidadModal from "./CalcularCantidadModal";

const ABMArticulos = () => {

    const [isCalcularModalOpen, setIsCalcularModalOpen] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState(null);

    const apiUrl = "http://localhost:8080";
    const entityName = "articulo";
    const columns = [
      "id",
      "nombre",
      "stockActual",
      "fechaAlta",
      "fechaBaja",
      "fechaModificacion",
      "cgi",
      "descripcion",
      "modeloInventario",
      "familiaArticulo",
      "proveedorPredeterminado",
      "valorLoteOptimo",
      "valorPuntoPedido",
      "stockSeguridad"
    ];

    const relatedObjects = [
      { apiName: "modInv", fieldName: "modeloInventario" },
      { apiName: "familia", fieldName: "familiaArticulo" },
      { apiName: "proveedor", fieldName: "proveedorPredeterminado" },
    ];

    const nonEditableFields = [
      "id",
      "fechaAlta",
      "fechaModificacion",
      "fechaBaja",
      "valorLoteOptimo",
      "valorPuntoPedido",
      "stockSeguridad"
    ];

    const createExcludedFields = [
      "id",
      "fechaAlta",
      "fechaBaja",
      "fechaModificacion",
      "modeloInventario",
      "valorLoteOptimo",
      "valorPuntoPedido",
      "stockSeguridad"
    ]

    /* Recibimos los objetos del ABM para agregarle los atributos del DTO */
    const extraDataFetch = async (objects) => {
      const ids = objects.map(obj => obj.id);

      /* Por cada objeto hacemos la consulta al back al DTO */
      const dtoDataPromises = ids.map(id => fetch(`${apiUrl}/articulo/getOne/${id}`).then(res => res.json()));

      /* Esperamos la data */
      const dtoDataArray = await Promise.all(dtoDataPromises);

      /* Les agregamos los nuevos valores buscados a los objetos y retornamos todo en uno solo*/
      return objects.map((obj, index) => ({
        ...obj,
        valorLoteOptimo: dtoDataArray[index].valorLoteOptimo,
        valorPuntoPedido: dtoDataArray[index].valorPuntoPedido,
        stockSeguridad: dtoDataArray[index].stockSeguridad
      }));
    };

    const handleCalcularCantidadVendida = async (id, fechaDesde, fechaHasta) => {
      try {
        const response = await fetch(`${apiUrl}/articulo/demandaHistorica/${id}?fechaDesde=${fechaDesde.value}&fechaHasta=${fechaHasta.value}`);
        const data = await response.json();
        Swal.fire({
          title: `CV: ${data} artículos`,
          background: "black",
          color: "white",
          padding: "1rem 2rem",
          icon: "info",
          toast: true,
          position:"center",
          confirmButtonColor:"#2596be",
          confirmButtonText:"Aceptar"
        });
      } catch (error) {
        Swal.fire({
          text: `Error al calcular la cantidad vendida.`,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
          position: "top",
        });
        console.error(error.message);
      }
    };

    const renderArticuloActions = (entity) => (
      <CalculateButton onClick={() => {
          setSelectedEntity(entity);
          setIsCalcularModalOpen(true);
      }}/>
    );

    return (
      <div>
        <ABMEntity 
          entityName={entityName} 
          apiUrl={apiUrl} 
          columns={columns} 
          nonEditableFields={nonEditableFields}
          relatedObjects={relatedObjects}
          extraDataFetch={extraDataFetch}
          createExcludedFields={createExcludedFields}
          renderActions={renderArticuloActions}
        />
        {isCalcularModalOpen && (
            <CalcularCantidadModal
                isOpen={isCalcularModalOpen}
                onClose={() => setIsCalcularModalOpen(false)}
                onCalcular={handleCalcularCantidadVendida}
                entity={selectedEntity}
            />
        )}
      </div>
    );
}

export default ABMArticulos;