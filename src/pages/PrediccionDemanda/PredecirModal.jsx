import React, { useState } from 'react'

const PredecirModal = ({ isOpen, onClose, onPredecir, articulo }) => {
    
    const [cantPeriodos, setCantPeriodos] = useState(0);


    const handlePredecirClick = () => {
        onPredecir(articulo.id, cantPeriodos);
    };

    return (
            <div className={`modal ${isOpen ? 'is-open' : ''}`}>
                <div className="modal-content">
                    <h2>Predecir demanda</h2>
                    <form>
                        <div>
                            <label htmlFor="articulo">Articulo</label>
                            <input
                                type="text"
                                id="articulo"
                                value={articulo.nombre}
                                disabled
                            />
                        </div>
                        <div>
                            <label htmlFor="cantPeriodos">Cantidad de periodos: </label>
                            <input
                                type="number"
                                id="cantPeriodos"
                                value={cantPeriodos}
                                onChange={(e) => setCantPeriodos(e.target.value)}
                            />
                        </div>
                        <div className="modal-actions">
                            <button type="button" onClick={handlePredecirClick}>Predecir</button>
                            <button type="button" onClick={onClose}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default PredecirModal