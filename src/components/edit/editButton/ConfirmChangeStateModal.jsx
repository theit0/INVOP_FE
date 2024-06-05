import React from 'react';

const ConfirmChangeStateModal = ({ entity, onClose, onUpdate }) => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    onUpdate(entity);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Cambiar Estado</h2>
        <p>¿Estás seguro que deseas cambiar el estado?</p>
        <div className="modal-actions">
          <button onClick={handleSubmit}>Confirmar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmChangeStateModal;
