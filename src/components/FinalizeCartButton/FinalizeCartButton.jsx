import React, { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import FinalizeCartModal from '../FinalizeCartModal/FinalizeCartModal';
import axios from 'axios';
import './FinalizeCartButton.css';

function FinalizeCartButton() {
  const { cartItems } = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleButtonClick = async () => {
    setIsModalVisible(true);

    try {

      let purchaseRequest = {
        products: cartItems.map((item) => ({ id: item.id, quantity: item.itemQuantity })),
      };

      const response = await axios.post('http://localhost:8080/product/purchase', purchaseRequest);
      console.log(response.data);
      setIsModalVisible(true);
    } catch (error) {
      console.error('Erro ao finalizar o carrinho:', error);
    }
  };

  return (
    <div>
      <button className="finalize-cart-button" type="submit" onClick={handleButtonClick}>
        Finalizar Compra
      </button>
      <FinalizeCartModal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)} cartItems={cartItems} />
    </div>
  );
}

export default FinalizeCartButton;
