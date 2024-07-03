import React, { useEffect, useState } from 'react'
import { fetchEntities } from '../../services/entityService';
import { getColumnValue } from '../../utils/entityUtils';

const ListarArticulosFaltantes = () => {
    const [articulos, setArticulos] = useState([]);

    const columns = ["id", "nombre","stockActual","stockSeguridad"];
  
    useEffect(() => {
      fetchAllData();
    }, []);
  
    const API_URL = 'http://localhost:8080';
  
    const fetchAllData = async () => {
      const articulos = await fetchEntities(API_URL, "articulo/getFaltantes");
      setArticulos(articulos);
    };
  
  
    return (
      <section className="abm-entity">
        <div className='abm-title'>
          <h1>Listado de articulos faltantes</h1>
          <p>Este es un listado de articulos faltantes</p>
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

export default ListarArticulosFaltantes