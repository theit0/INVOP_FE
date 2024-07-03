import ABMEntity from "../../gen/ABMEntity"


const ABMArticuloDatoModeloArticulo = () => {
    const entityName2 = "articuloDatoModeloArticulo"
    const apiUrl = "http://localhost:8080"
    const columns2 = [
        "id",
        "valorDato",
        "articulo",
        "datoModeloArticulo"
    ]
    const nonEditableFields2 = [
        "id",
        "fechaAlta",
        "fechaBaja",
        "fechaModificacion",
        "articulo"
    ]
    const createExcludedFields2 = [
        "id",
        "fechaAlta",
        "fechaBaja",
        "fechaModificacion",
    ]

    const relatedObjects2 = [
      { apiName: "articulo", fieldName: "articulo" },
      { apiName: "datoModeloArticulo", fieldName: "datoModeloArticulo" },
    ];
  return (
    <div>
        <ABMEntity 
          entityName={entityName2} 
          apiUrl={apiUrl} 
          columns={columns2} 
          relatedObjects={relatedObjects2}
          nonEditableFields={nonEditableFields2}
          createExcludedFields={createExcludedFields2}
        />

    </div>
  )
}

export default ABMArticuloDatoModeloArticulo