import { useState, useEffect } from "react";
import ABMEntity from "../../gen/ABMEntity";
import AddDemoraProveedorArticulo from '../../gen/AddDemoraProveedorArticulo';
import { updateEntity } from '../../services/entityService'; // Asegúrate de tener la ruta correcta

const ABMProveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const apiUrl = "http://localhost:8080";
    const entityName = "proveedor";

    useEffect(() => {
        // Cargar proveedores iniciales desde la API si es necesario
    }, []);

    const handleAddDemora = async (proveedor, demoraProveedorArticulo) => {
        const updatedProveedor = {
            ...proveedor,
            demoraProveedorArticulos: [...(proveedor.demoraProveedorArticulos || []), demoraProveedorArticulo]
        };

        try {
            await updateEntity(apiUrl, entityName, updatedProveedor);
            const updatedProveedores = proveedores.map(p =>
                p.id === proveedor.id ? updatedProveedor : p
            );
            setProveedores(updatedProveedores);
            updateProveedorState(updatedProveedor);
        } catch (error) {
            console.error('Error updating provider:', error);
        }
    };

    const handleRemoveDemora = async (proveedor, demoraIndex) => {
        const updatedProveedor = {
            ...proveedor,
            demoraProveedorArticulos: proveedor.demoraProveedorArticulos.filter((_, i) => i !== demoraIndex)
        };

        try {
            await updateEntity(apiUrl, entityName, updatedProveedor);
            const updatedProveedores = proveedores.map(p =>
                p.id === proveedor.id ? updatedProveedor : p
            );
            setProveedores(updatedProveedores);
        } catch (error) {
            console.error('Error updating provider:', error);
        } 
    };

    const columns = [
        "id",
        "fechaAlta",
        "fechaBaja",
        "fechaModificacion",
        "nombre",
        "direccion",
        "telefono",
        "email"
    ];
    const nonEditableFields = [
        "id",
        "fechaAlta",
        "fechaBaja",
        "fechaModificacion",
        "demoraProveedorArticulos"
    ];
    const createExcludedFields = [
        "id",
        "fechaAlta",
        "fechaBaja",
        "fechaModificacion",
        "demoraProveedorArticulos"
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
                    addSubEntity: handleAddDemora,
                    removeSubEntity: handleRemoveDemora,
                    subEntityComponent: AddDemoraProveedorArticulo,
                    subEntityField: "demoraProveedorArticulos"
                }} 
                nonEditableFields={nonEditableFields}
                createExcludedFields={createExcludedFields}
            />
        </div>
    );
}

export default ABMProveedores;
