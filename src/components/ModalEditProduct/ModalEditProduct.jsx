import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './ModalEditProduct.css';

function ModalEditProduct({ openModal, setOpenModal, data }) {

  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    console.log('Product Data:', data);
    if (data) {
      setProductName(data.name || '');
      setProductQuantity(data.quantity || null);
      setProductPrice(data.price || null);
      setProductImage(data.image || null);
    }
  }, [data]);

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'file' ? target.files[0] : target.value;
    const name = target.name;

    switch (name) {
    case 'productName':
      setProductName(value);
      break;
    case 'productQuantity':
      setProductQuantity(value);
      break;
    case 'productPrice':
      setProductPrice(value);
      break;
    case 'productImage':
      if (value) {
        setProductImage(URL.createObjectURL(value));
      } else {
        setProductImage(null);
      }
      break;
    default:
      break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!data) {
      console.error('Product data is undefined');
      return;
    }

    const productDataJSON = {
      id: data.id,
      name: productName,
      quantity: Number(productQuantity),
      price: Number(productPrice),
    };

    if (productImage) {
      const file = new File([productImage], data.name, { type: 'image/*' });
      productDataJSON.image = file;
    }

    try {
      const response = await fetch(`http://localhost:8080/product/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productDataJSON),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      setOpenModal(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    openModal && (
      <div className="modal-overlay" onClick={handleModalClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <header>
            <h2>Editar Produto</h2>
            <span className="close-button" onClick={handleModalClose}>
              &times;
            </span>
          </header>
          <form onSubmit={handleSubmit}>
            <label htmlFor="productName">Nome:</label>
            <input type="text" name="productName" id="productName" value={productName} onChange={handleInputChange} required />

            <label htmlFor="productQuantity">Quantidade:</label>
            <input type="number" name="productQuantity" id="productQuantity" value={productQuantity || ''} onChange={handleInputChange} required />

            <label htmlFor="productPrice">Preço:</label>
            <input type="number" name="productPrice" id="productPrice" value={productPrice || ''} onChange={handleInputChange} required />

            <label htmlFor="productImage">Imagem:</label>
            <input type="file" name="productImage" id="productImage" onChange={handleInputChange} accept="image/*" />

            <button type="submit">Atualizar Dados</button>
          </form>
        </div>
      </div>
    )
  );
}

ModalEditProduct.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
  }),
};

export default ModalEditProduct;
