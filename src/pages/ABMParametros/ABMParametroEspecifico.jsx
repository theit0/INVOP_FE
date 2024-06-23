import ABMEntity from "../../gen/ABMEntity";

const ABMParametroEspecifico = () => {
    const apiUrl = "http://localhost:8080";
    const entityName = "parametroEspecifico";
    const columns = [
      "id",
      "nombreParametro",
      "valorParametro"
    ];
  
    const createExcludedFields = [
      "id",
      "fechaAlta",
        "fechaBaja",
        "fechaModificacion",
    ];
  
    const nonEditableFields = [
      "id",
        "fechaAlta",
        "fechaBaja",
        "fechaModificacion",
    ];
    return (
      <div>
          <ABMEntity
              entityName={entityName}
              apiUrl={apiUrl}
              nonEditableFields={nonEditableFields}
              createExcludedFields={createExcludedFields}
              columns={columns}
        />
      </div>
    )
}

export default ABMParametroEspecifico