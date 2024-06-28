import React, { useEffect, useState } from 'react'
import { getColumnValue } from '../../utils/entityUtils';
import { fetchEntities } from '../../services/entityService';
import CalcularDemandaButton from '../../components/calculate/CalcularDemandaButton';
import PredecirModal from './PredecirModal';
import Swal from 'sweetalert2';

const PrediccionDemanda = () => {

    const [articulos,setArticulos] = useState([]);
    const [isPredecirModalOpen, setIsPredecirModalOpen] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState(null);

    const columns = [
        "id",
        "nombre",
    ]

    useEffect(() => {
        fetchAllData();
    }, []);

    const API_URL = 'http://localhost:8080'

    const fetchAllData = async () => {
        const articulos = await fetchEntities(API_URL, "articulo");
        setArticulos(articulos);
    };



    const onPredecir = async (id, cantPeriodos) => {
        try {
          const response = await fetch(`${API_URL}/predicciondemanda/predecirDemanda/${id}?cantPeriodos=${cantPeriodos}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
          });
          const data = await response.json();

          
          console.log(data)
          Swal.fire({
            title: `CV: ${111} ventas
            Hola como estas
            `,
            background: "black",
            color: "white",
            padding: "1rem 2rem",
            icon: "info",
            toast: true,
            position:"center",
            confirmButtonColor:"#2596be",
            confirmButtonText:"Aceptar"
          });
        } catch (error) {
          Swal.fire({
            text: `Error al predecir la demanda.`,
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
            position: "top",
          });
          console.error(error.message);
        }
    };

    const handleChangePredecirClick =  (articulo) => {
        setSelectedEntity(articulo)
        setIsPredecirModalOpen(true)
    };

    return (
        <section className="abm-entity">
                <div className='abm-title'>
                    <h1>Predecir demanda</h1>
                    <p>Predecir demanda para cierto articulo y periodo de tiempo.</p>
                </div>

                <table className="entity-table">
                    <thead>
                        
                            {columns.map(column => (
                                <th key={column}>{column}</th>
                            ))}
                            <th>Acciones</th>
                        
                    </thead>
                    <tbody>
                        {articulos.map((articulo) => (
                            <tr key={articulo.id}>
                                {columns.map(column => (
                                    <td key={column}>{getColumnValue(articulo, column)}</td>
                                ))}
                                <td className='action-btns'>
                                    <CalcularDemandaButton onClick={() => handleChangePredecirClick(articulo)}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {isPredecirModalOpen && (
                    <PredecirModal
                        isOpen={isPredecirModalOpen}
                        onClose={() => setIsPredecirModalOpen(false)}
                        onPredecir={onPredecir}
                        articulo={selectedEntity}
                    />
                )}
                    
                {/* {isModalOpen && (
                    <EditModalGeneric
                        entity={selectedEntity}
                        onClose={handleModalClose}
                        onUpdate={handleUpdateEntity}
                        nonEditableFields={nonEditableFields}
                        relatedObjects={relatedData}
                        subEntityHandlers={subEntityHandlers}
                    />
                )} */}

            
            </section>
    )
}

export default PrediccionDemanda