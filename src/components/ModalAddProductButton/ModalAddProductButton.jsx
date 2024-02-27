import React, { useState } from 'react';
import ModalProduct from '../ModalAddProduct/ModalAddProduct';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import './ModalAddProductButton.css';

function ModalAddProductButton() {
  const [openModal, setOpenModal] = useState(false);

  const handleButtonClick = () => {
    setOpenModal(!openModal);
  };

  return (
    <div>    
      <button
        type="button"
        className="new__product__button"
        onClick={handleButtonClick}
      >
        <AiOutlineAppstoreAdd />   
      </button>
      <ModalProduct openModal={openModal} setOpenModal={setOpenModal} />
    </div>
    
  );
}

ModalAddProductButton.propTypes = {
  // Nenhuma propriedade para definir aqui
};

export default ModalAddProductButton;
