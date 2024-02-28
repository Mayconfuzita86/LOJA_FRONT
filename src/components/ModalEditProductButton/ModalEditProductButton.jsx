import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Corrigir a importação
import ModalEditProduct from '../ModalEditProduct/ModalEditProduct';
import { AiOutlineTool } from 'react-icons/ai';
import './ModalEditProductButton.css';

function ModalEditProductButton({ selectedProduct }) {
  const [openModalUpload, setOpenModalUpload] = useState(false);

  const handleButtonClick = () => {
    setOpenModalUpload(!openModalUpload);
  };

  return (
    <div>
      <button
        type="button"
        className="edit__product__button"
        onClick={handleButtonClick}
      >
        <AiOutlineTool />
      </button>
      {/* Passar o produto selecionado para a modal */}
      <ModalEditProduct openModal={openModalUpload} setOpenModal={setOpenModalUpload} data={selectedProduct} />
    </div>
  );
}

ModalEditProductButton.propTypes = {
  selectedProduct: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
  }),
};

export default ModalEditProductButton;
