import React from 'react';
import "../components/modal/Modal.css"

const DeleteModalGeneric = ({ onClose, onDelete, entity }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirmar Eliminación</h2>
        <p>¿Estás seguro de eliminar?</p>
        <div className="modal-actions">
          <button onClick={() => onDelete(entity.id)}>Eliminar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalGeneric;