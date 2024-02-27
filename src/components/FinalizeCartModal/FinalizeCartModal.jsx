// FinalizeCartModal.jsx
import React from 'react';
import PropTypes from 'prop-types';

function FinalizeCartModal({ isOpen, onClose }) {
  return (
    isOpen && (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <header>
            <h2>Compra realizada com sucesso!</h2>
            <span className="close-button" onClick={onClose}>
              &times;
            </span>
          </header>
        </div>
      </div>
    )
  );
}

FinalizeCartModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FinalizeCartModal;
