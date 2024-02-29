import React from 'react';
import PropTypes from 'prop-types';
import './ModalDeleteConfirmation.css';

function ModalDeleteConfirmation({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) {
    return null;
  }

  const deleteProduct = () => {
    onConfirm();
    window.location.reload(); 
  };

  return (
    <div className="confirmation-modal">
      <p>Tem certeza que deseja excluir o produto?</p>
      <button onClick={onCancel}>Cancelar</button>
      <button onClick={deleteProduct}>Confirmar</button>
    </div>
  );
}

ModalDeleteConfirmation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ModalDeleteConfirmation;
