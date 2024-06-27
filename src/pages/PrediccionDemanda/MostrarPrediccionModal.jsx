import React from 'react';

const MostrarPrediccionModal = ({ isOpen, onClose, prediccionData }) => {
  if (!prediccionData) return null;

  const { metodoPrediccion, detallePrediccions } = prediccionData;

  return (
    <div className={`modal ${isOpen ? 'is-open' : ''}`}>
      <div className="modal-content">
        <h2>Método de Predicción: {metodoPrediccion.nombre}</h2>
        <table className='entity-table'>
          <thead>
            <tr>
              <th>Mes</th>
              <th>Valor Predicción</th>
            </tr>
          </thead>
          <tbody>
            {detallePrediccions.map((detalle, index) => (
              <tr key={index}>
                <td>{detalle.mes}</td>
                <td>{detalle.valorPredecido}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="modal-actions">
          <button type="button" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default MostrarPrediccionModal;
