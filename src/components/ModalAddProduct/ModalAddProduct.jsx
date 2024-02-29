import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ModalAddProduct.css';

function ModalAddProduct({ openModal, setOpenModal }) {
  const [productPrice, setProductPrice] = useState('');
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const productQuantity = document.getElementById('productQuantity').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').files[0];
    console.log(productImage);

    const numericPrice = parseFloat(productPrice.replace(/[^\d,]/g, '').replace(',', '.'));

    const formData = new FormData();

    const productData = {
      name: productName,
      quantity: Number(productQuantity),
      price: Number(numericPrice) / 100,  
    };

    formData.append('productData', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
    
    if (productImage) {
      formData.append('image', productImage);
    } else {
      formData.append('image', null);
    }

    console.log('FormData:', formData);

    try {
      const response = await fetch('http://localhost:8080/product', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.log('response:', response);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
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

  const handlePriceChange = (event) => {
    let value = event.target.value.replace(/\D/g, '');
    value = (value / 100).toFixed(2); 
    setProductPrice(value);
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
            <input type="text" id="productPrice" value={productPrice} onChange={handlePriceChange}required />

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
