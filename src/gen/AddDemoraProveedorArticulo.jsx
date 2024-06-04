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
                    <label className="modal-label">Artículo:</label>
                    <select value={selectedArticle} onChange={(e) => setSelectedArticle(e.target.value)}>
                        <option value="">Seleccione un artículo</option>
                        {articles.map(article => (
                            <option key={article.id} value={article.id}>{article.nombre}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="modal-label">Demora:</label>
                    <input 
                        type="number" 
                        value={delay} 
                        onChange={(e) => setDelay(e.target.value)} 
                    />
                </div>
                <div className="modal-actions">
                    <button onClick={handleSave} className="add-demora-button">Guardar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default AddDemoraProveedorArticulo;
