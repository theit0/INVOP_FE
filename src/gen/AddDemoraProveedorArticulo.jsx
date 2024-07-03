import React, { useEffect, useState } from 'react';
import "../components/modal/Modal.css";  // Asegúrate de importar el archivo CSS aquí
import { fetchEntities } from '../services/entityService';

const AddDemoraProveedorArticulo = ({ onClose, onSave, subEntityApiName }) => {
    const [selectedArticle, setSelectedArticle] = useState("");
    const [delay, setDelay] = useState("");
    const [costoPedido, setCostoPedido] = useState("");
    const [precioArt, setPrecioArt] = useState("");
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getArticles();
    }, []);

    const getArticles = async () => {
        const articles = await fetchEntities("http://localhost:8080", subEntityApiName); 
        setArticles(articles);
    };

    const handleSave = () => {
        const article = articles.find(article => article.id === parseInt(selectedArticle));
        if (!article) {
            console.error("Artículo no encontrado");
            return;
        }

        const demoraProveedorArticulo = {
            articulo: article,  // Asigna el artículo completo aquí
            tiempoDemora: delay,
            costoPedido: costoPedido,
            precioArt: precioArt
        };
        onSave(demoraProveedorArticulo);
        onClose(); // Cierra el modal después de guardar
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
                <div>
                    <label>Costo pedido</label>
                    <input 
                        type="number" 
                        value={costoPedido} 
                        onChange={(e) => setCostoPedido(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Precio artículo</label>
                    <input 
                        type="number" 
                        value={precioArt} 
                        onChange={(e) => setPrecioArt(e.target.value)} 
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