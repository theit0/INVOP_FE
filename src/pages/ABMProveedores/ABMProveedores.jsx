import ABMEntity from "../../gen/ABMEntity"

const ABMProveedores = () => {

    const entityName = "proveedor"
    const apiUrl = "http://localhost:8080"
    const columns = [
        "id",
        "fechaAlta",
        "fechaBaja",
        "fechaModificacion",
        "nombre",
        "direccion"
    ]
    const nonEditableFields = [
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
          nonEditableFields={nonEditableFields}
          createExcludedFields={createExcludedFields}
        />
      </div>
  )
}

export default ABMProveedores