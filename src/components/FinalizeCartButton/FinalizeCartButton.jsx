import React, { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import FinalizeCartModal from '../FinalizeCartModal/FinalizeCartModal';
import axios from 'axios'; // Importando axios
import './FinalizeCartButton.css';

function FinalizeCartButton() {
  const { cartItems, /*clearCart*/ } = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleButtonClick = async () => {
    setIsModalVisible(true); //temporário nesta posição
    try {
      // Ajuste a URL conforme necessário
      const response = await axios.post('http://localhost:8080/api/carrinho/finalizar', cartItems);
      console.log(response.data);
      // Limpar o carrinho após a finalização
      // clearCart(); // Descomente esta linha se desejar limpar o carrinho após a finalização
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
