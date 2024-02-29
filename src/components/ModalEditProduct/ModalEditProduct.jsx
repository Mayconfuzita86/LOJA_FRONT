import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalDeleteConfirmation from '../ModalDeleteConfirmation/ModalDeleteConfirmation';
import './ModalEditProduct.css';

function ModalEditProduct({ openModal, setOpenModal, data, onDelete }) {
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

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

  const handlePriceChange = (event) => {
    let value = event.target.value.replace(/\D/g, '');
    value = (value / 100).toFixed(2);
    setProductPrice(value);
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
    console.log('DADOS: ', data);
    console.log('FOTO IMAGEM:', productImage);
    const formData = new FormData();

    const productData = {
      id: data.id,
      name: productName,
      quantity: Number(productQuantity),
      price: Number(productPrice), 
    };

    formData.append('productData', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
    
    if (productImage) {
      // console.log('FOTO Maycon:', productImage);
      formData.append('image', productImage);
    } else {
      formData.append('image', null);
    }
    console.log('FORMDATA:', formData.get('image'));

    try {
      const response = await fetch('http://localhost:8080/product/update', {
        method: 'POST',
        body: formData,                
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      setOpenModal(false);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteClick = () => {
    setConfirmationModalOpen(true); 
  };

  const handleConfirmationCancel = () => {
    setConfirmationModalOpen(false);
  };

  const handleConfirmationConfirm = async () => {
    try {
      console.error('ID DE EXCLUSAO: ', data.id);
      const response = await fetch(`http://localhost:8080/product/${data.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Delete Success:', responseData);
      setOpenModal(false);
      onDelete(data.id);
    } catch (error) {
      console.error('Delete Error:', error);
    } finally {
      setConfirmationModalOpen(false);
    }
  };

  return (
    <>
      {openModal && (
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
              <input type="text" id="productPrice" value={productPrice} onChange={handlePriceChange} required />

              <label htmlFor="productImage">Imagem:</label>
              <input type="file" name="productImage" id="productImage" onChange={handleInputChange} accept="image/*" />

              <button type="submit">Atualizar Dados</button>

              <button type="button" className="delete-product-button" onClick={handleDeleteClick}>
                Excluir Produto
              </button>
            </form>
          </div>
        </div>
      )}
      <ModalDeleteConfirmation
        isOpen={isConfirmationModalOpen}
        onCancel={handleConfirmationCancel}
        onConfirm={handleConfirmationConfirm}
      />
    </>
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
  onDelete: PropTypes.func.isRequired,
};

export default ModalEditProduct;
