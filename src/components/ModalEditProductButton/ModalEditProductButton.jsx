import React, { useState } from 'react';
import ModalUploadProduct from '../ModalEditProduct/ModalEditProduct';
import { AiOutlineTool } from 'react-icons/ai';
import './ModalEditProductButton.css';

function ModalEditProductButton() {
  const [openModalUpload, setOpenModalUpload] = useState(false);

  const handleButtonClick = () => {
    console.log('Botão clicado'); // Adicione este log
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
      <ModalUploadProduct openModal={openModalUpload} setOpenModal={setOpenModalUpload} />
    </div>
    
  );
}

ModalEditProductButton.propTypes = {
  // Nenhuma propriedade para definir aqui
};

export default ModalEditProductButton;
