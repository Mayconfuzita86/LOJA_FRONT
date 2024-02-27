import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ModalEditProduct.css';

function ModalEditProduct({ openModal, setOpenModal, productData }) {
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    if (productData) {
      setProductName(productData.name || '');
      setProductQuantity(productData.quantity || '');
      setProductPrice(productData.price || '');
      // Se estiver editando, você pode querer manter a imagem atual ou fornecer uma prévia
      setProductImage(productData.image || null);
    }
  }, [productData]);

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
      setProductImage(value);
      break;
    default:
      break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Criar um objeto com os dados do produto
    const productDataJSON = {
      id: productData.id, // Adicionado o ID do produto
      name: productName,
      quantity: Number(productQuantity),
      price: Number(productPrice),
      image: productImage, // Se estiver editando, pode precisar lidar com a imagem de maneira diferente
    };

    // Enviar os dados para a API
    try {
      const response = await fetch(`http://localhost:8080/product/${productData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productDataJSON),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      // Fechar a modal após o envio do formulário
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
            <span className="close-button" onClick={handleModalClose}>&times;</span>
          </header>
          <form onSubmit={handleSubmit}>
            <label htmlFor="productName">Nome:</label>
            <input type="text" name="productName" id="productName" value={productName} onChange={handleInputChange} required />

            <label htmlFor="productQuantity">Quantidade:</label>
            <input type="number" name="productQuantity" id="productQuantity" value={productQuantity} onChange={handleInputChange} required />

            <label htmlFor="productPrice">Preço:</label>
            <input type="number" name="productPrice" id="productPrice" value={productPrice} onChange={handleInputChange} required />

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
  productData: PropTypes.shape({
    id: PropTypes.string, // Adicionado o PropTypes para a propriedade id
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
  }),
};

export default ModalEditProduct;
