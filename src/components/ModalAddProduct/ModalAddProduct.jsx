import React from 'react';
import PropTypes from 'prop-types';
import './ModalAddProduct.css';

function ModalAddProduct({ openModal, setOpenModal }) {
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Coletar os valores dos campos do formulário
    const productName = document.getElementById('productName').value;
    const productQuantity = document.getElementById('productQuantity').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').files[0]; // Obter o arquivo da imagem

    // Criar um objeto com os dados do produto
    const productData = {
      name: productName,
      quantity: Number(productQuantity),
      price: Number(productPrice),
      image: productImage,
    };

    // Enviar os dados para a API
    try {
      const response = await fetch('http://localhost:8080/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      // Fechar a modal após o envio do formulário
      setOpenModal(false);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const validatePositiveInput = (event) => {
    if (event.target.value < 0) {
      event.target.value = '';
    }
  };

  return (
    openModal && (
      <div className="modal-overlay" onClick={handleModalClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <header>
            <h2>Cadastrar Novo Produto</h2>
            <span className="close-button" onClick={handleModalClose}>
              &times;
            </span>
          </header>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="productName">Nome:</label>
            <input type="text" id="productName" required />

            <label htmlFor="productQuantity">Quantidade:</label>
            <input type="number" id="productQuantity" min="0" onInput={validatePositiveInput} required />

            <label htmlFor="productPrice">Preço:</label>
            <input type="number" id="productPrice" min="0" onInput={validatePositiveInput} required />

            <label htmlFor="productImage">Imagem:</label>
            <input type="file" id="productImage" accept="image/*" />

            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    )
  );
}

ModalAddProduct.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

export default ModalAddProduct;
