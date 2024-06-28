import React, { useEffect, useState } from 'react'
import { fetchEntities } from '../../services/entityService';
import { getColumnValue } from '../../utils/entityUtils';

const ListarArticulosAReponer = () => {
  const [articulos, setArticulos] = useState([]);

  const columns = ["id", "nombre","stockActual","valorPuntoPedido"];

  useEffect(() => {
    fetchAllData();
  }, []);

  const API_URL = 'http://localhost:8080';

  const fetchAllData = async () => {
    const articulos = await fetchEntities(API_URL, "articulo/reponer");
    setArticulos(articulos);
  };


  return (
    <section className="abm-entity">
      <div className='abm-title'>
        <h1>Listado de articulos a reponer</h1>
        <p>Este es un listado de articulos a reponer</p>
      </div>

      <table className="entity-table">
        <thead>
          {columns.map(column => (
            <th key={column}>{column}</th>
          ))}
        </thead>
        <tbody>
          {articulos.map((articulo) => (
            <tr key={articulo.id}>
              {columns.map(column => (
                <td key={column}>{getColumnValue(articulo, column)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

    </section>
  );
}

export default ListarArticulosAReponer