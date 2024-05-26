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
    ];

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

    return (
      <div>
        <ABMEntity 
          entityName={entityName} 
          apiUrl={apiUrl} 
          columns={columns} 
          nonEditableFields={nonEditableFields}
          relatedObjects={relatedObjects}
          extraDataFetch={extraDataFetch}
        />
      </div>
    );
}

export default ABMArticulosPrueba;
