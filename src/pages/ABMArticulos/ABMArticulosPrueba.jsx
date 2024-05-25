import ABMEntity from "../../components/generics/ABMEntity";
import "./ABMArticulos.css"

const ABMArticulosPrueba = () => {
    const apiUrl = "http://localhost:8080";
    const entityName = "articulo";
    const columns = [
      "id",
      "fechaAlta",
      "fechaBaja",
      "fechaModificacion",
      "cgi",
      "descripcion",
      "nombre",
      "stockActual",
      "familiaArticulo",
      "proveedorPredeterminado",
      /* "modelo_inventario_id", */
      /* "lote_optimo",
      "punto_pedido",
      "stock_seguridad" */
    ];
    const nonEditableFields = [
      "id",
      "fechaAlta",
      "fechaModificacion",
      "fechaBaja",
      /* "modelo_inventario_id",
      "lote_optimo",
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
        />
      </div>
    );
}

export default ABMArticulosPrueba