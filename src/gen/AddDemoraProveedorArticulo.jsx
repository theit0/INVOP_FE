import React, { useState } from 'react';
import "../components/modal/Modal.css";  // Asegúrate de importar el archivo CSS aquí

const AddDemoraProveedorArticulo = ({ onClose, onSave, articles }) => {
    const [selectedArticle, setSelectedArticle] = useState("");
    const [delay, setDelay] = useState("");

    const handleSave = () => {
        const demoraProveedorArticulo = {
            articulo: articles.find(article => article.id === parseInt(selectedArticle)),
            tiempoDemora: delay
        };
        onSave(demoraProveedorArticulo);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Agregar Demora Proveedor Artículo</h2>
                <div>
                    <label>Artículo</label>
                    <select value={selectedArticle} onChange={(e) => setSelectedArticle(e.target.value)}>
                        <option value="" disabled>Seleccione un artículo</option>
                        {articles.map(article => (
                            <option key={article.id} value={article.id}>{article.nombre}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Demora (días)</label>
                    <input 
                        type="number" 
                        value={delay} 
                        onChange={(e) => setDelay(e.target.value)} 
                    />
                </div>
                <div className="modal-actions">
                    <button type="button" onClick={handleSave}>Guardar</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default AddDemoraProveedorArticulo;
