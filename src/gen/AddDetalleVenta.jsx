import { useEffect, useState } from "react";
import { fetchEntities } from "../services/entityService";

const AddDetalleVenta = ({ onClose, onSave, subEntityApiName }) => {
    const [selectedArticle, setSelectedArticle] = useState("");
    const [quantity, setQuantity] = useState("");
    const [articles,setArticles] = useState([])

    useEffect(()=>{
        getArticles()
    },[])

    const getArticles = async () => {
        const articles = await fetchEntities("http://localhost:8080", subEntityApiName); 
        setArticles(articles)
    }

    const handleSave = () => {
        const detalleVenta = {
            articulo: articles.find(article => article.id === parseInt(selectedArticle)),
            cantidad: quantity
        };
        onSave(detalleVenta);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Agregar Detalle Venta</h2>
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
                    <label>Cantidad</label>
                    <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                    />
                </div>
                <div className="modal-actions">
                    <button type="button" onClick={handleSave}>Guardar</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default AddDetalleVenta;