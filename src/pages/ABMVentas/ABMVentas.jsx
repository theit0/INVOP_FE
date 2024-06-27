import React, { useEffect, useState } from 'react'
import ABMEntity from '../../gen/ABMEntity';
import AddDetalleVenta from "../../gen/AddDetalleVenta";
import { fetchEntities } from '../../services/entityService';
const ABMVentas = () => {
    const [ventas, setVentas] = useState([]);
    const apiUrl = "http://localhost:8080";
    const entityName = "venta";

    useEffect(() => {
        getVentas()
    }, []);

    const getVentas = async()=>{
        const ventas = await fetchEntities(apiUrl, entityName); 
        setVentas(ventas)
    }

    const handleAddArticulo = async (venta, detalleVenta) => {
        const updatedVenta = {
            ...venta,
            detalleVentas: [...(venta.detalleVentas || []), detalleVenta]
        };

        try {
            /* await updateEntity(apiUrl, entityName, updatedProveedor); */
            const updatedVentas = ventas.map(v =>
                v.id === venta.id ? updatedVenta : v
            );
            setVentas(updatedVentas);
        } catch (error) {
            console.error('Error updating sell:', error);
        }
    };

    const handleRemoveDetalle = async (venta, detalleVentaIndex) => {
        const updatedVenta = {
            ...venta,
            detalleVentas: venta.detalleVentas.filter((_, i) => i !== detalleVentaIndex)
        };

        try {
            const updatedVentas = ventas.map(v =>
                v.id === venta.id ? updatedVenta : v
            );
            setVentas(updatedVentas);
        } catch (error) {
            console.error('Error updating sell:', error);
        }
    };

    const columns = [
        "id",
        "montoTotal",
        "fechaVenta",
        "detalleVentas",
    ];
    const nonEditableFields = [
        "id",
        "fechaAlta",
        "fechaBaja",
        "fechaModificacion",
        "fechaVenta",
        "detalleVentas",
    ];
    const createExcludedFields = [
        "id",
        "fechaAlta",
        "fechaBaja",
        "fechaModificacion",
        "montoTotal",
        "detalleVentas",
    ];
    const relatedObjects = [
        { apiName: "articulo", fieldName: "articulo" },
    ];

    return (
        <div>
            <ABMEntity 
                entityName={entityName} 
                apiUrl={apiUrl} 
                columns={columns}
                relatedObjects={relatedObjects}
                subEntityHandlers={{
                    addSubEntity: handleAddArticulo,
                    removeSubEntity: handleRemoveDetalle,
                    subEntityComponent: {
                        component: AddDetalleVenta,
                        subEntityApiName: "articulo",
                        fields: {
                            articulo: "id",
                            subtotal: "subtotal",
                            cantidad: "cantidad"
                        },
                        hasEditableDetails:false
                    },
                    subEntityField: "detalleVentas"
                }} 
                nonEditableFields={nonEditableFields}
                createExcludedFields={createExcludedFields}
            />
        </div>
    );
}

export default ABMVentas