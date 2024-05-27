import React, { useState } from 'react';
import "../../components/modal/Modal.css"

const CalcularCantidadModal = ({ isOpen, onClose, onCalcular, entity }) => {
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');

    const handleCalcularClick = () => {
        onCalcular(entity.id, fechaInicio, fechaFin);
    };

    return (
        <div className={`modal ${isOpen ? 'is-open' : ''}`}>
            <div className="modal-content">
                <h2>Calcular Cantidad Vendida</h2>
                <form>
                    <div>
                        <label htmlFor="fechaInicio">Fecha Desde:</label>
                        <input
                            type="date"
                            id="fechaInicio"
                            value={fechaDesde}
                            onChange={(e) => setFechaDesde(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="fechaFin">Fecha Hasta:</label>
                        <input
                            type="date"
                            id="fechaFin"
                            value={fechaHasta}
                            onChange={(e) => setFechaHasta(e.target.value)}
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={handleCalcularClick}>Calcular</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CalcularCantidadModal;
