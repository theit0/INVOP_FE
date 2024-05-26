import ABMEntity from "../../components/generics/ABMEntity";
import "./ABMArticulos.css"

const ABMArticulosPrueba = () => {
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
      /* "loteOptimo",
      "puntoPedido",
      "stockSeguridad" */
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
      /*"lote_optimo",
      "punto_pedido",
      "stock_seguridad" */
    ];
  
    return (
      <div>
        <ABMEntity 
          entityName={entityName} 
          apiUrl={apiUrl} 
          columns={columns} 
          nonEditableFields={nonEditableFields}
          relatedObjects={relatedObjects}
        />
      </div>
    );
}

export default ABMArticulosPrueba