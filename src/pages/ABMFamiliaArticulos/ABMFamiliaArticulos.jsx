import ABMEntity from "../../gen/ABMEntity"

const ABMFamiliaArticulos = () => {
    const entityName = "familia"
    const apiUrl = "http://localhost:8080"
    const columns = [
        "id",
        "fechaAlta",
        "fechaBaja",
        "fechaModificacion",
        "nombre",
    ]
    const nonEditableField = [
        "id",
        "fechaAlta",
        "fechaBaja",
        "fechaModificacion",
    ]
    const createExcludedFields = [
        "id",
        "fechaAlta",
        "fechaBaja",
        "fechaModificacion",
    ]

    return (
    <div>
        <ABMEntity 
          entityName={entityName} 
          apiUrl={apiUrl} 
          columns={columns} 
          nonEditableFields={nonEditableField}
          createExcludedFields={createExcludedFields}
        />
    </div>
  )
}

export default ABMFamiliaArticulos