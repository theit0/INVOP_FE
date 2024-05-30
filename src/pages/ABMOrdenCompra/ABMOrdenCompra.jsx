import ABMEntity from "../../gen/ABMEntity";


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
    ]

    const nonEditableFields = [
      "id",
      "fechaAlta",
      "fechaBaja",
      "fechaModificacion",
      "fechaCreacion",
      "articulo",
      "montoTotal"
    ]

    return (
      <div>
          <ABMEntity 
              entityName={entityName} 
              apiUrl={apiUrl} 
              columns={columns} 
              relatedObjects={relatedObjects}
              nonEditableFields={nonEditableFields}
              createExcludedFields={createExcludedFields}
          />
      </div>
    )
}

export default ABMOrdenCompra