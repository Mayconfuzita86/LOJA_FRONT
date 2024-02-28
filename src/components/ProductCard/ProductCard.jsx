import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { BsFillCartPlusFill } from 'react-icons/bs';

import './ProductCard.css';
import formatCurrency from '../../utils/formatCurrency';
import AppContext from '../../context/AppContext';
import ModalEditProductButton from '../ModalEditProductButton/ModalEditProductButton';
import ModalEditProduct from '../ModalEditProduct/ModalEditProduct';

function ProductCard({ data }) {
  const { name, image, price, quantity } = data;
  const { cartItems, setCartItems } = useContext(AppContext);

  const appUrl = 'http://localhost:8080';

  const handleAddCart = () => {
    // Verifica se o item já está no carrinho pelo ID
    const isItemInCart = cartItems.some((item) => item.id === data.id);
  
    if (!isItemInCart) {
      // Se o item não estiver no carrinho, adiciona
      const updatedData = { ...data, itemQuantity: 1 };
      setCartItems([...cartItems, updatedData]);
    } else {
      console.log('Este item já está no carrinho');

    }
  };
  

  // Verifique se 'image' é uma string antes de chamar 'replace'
  const imageUrl = typeof image === 'string' ? `${appUrl}/image/${image}` : `${appUrl}/image/d780bb11-f449-4863-aaf6-d874866e0e3c.jpg`;

  return (
    <section className="product-card">
      <img src={imageUrl} alt="product" className="card__image" />

      <div className="card__infos">
        <h2 className="card__price">{formatCurrency(price, 'BRL')}</h2>
        <h2 className="card__name">{name}</h2>
        <p className="card__stock">Estoque: {quantity} unidades</p>
      </div>

      <div className="card__buttons">
        <button type="button" className="button__add-cart" onClick={handleAddCart}>
          <BsFillCartPlusFill />
        </button>
        
      </div>
      <div className="card__buttons">
        <button type="button" className="button__edit-cart">
          <ModalEditProductButton />
          <ModalEditProduct />
        </button>
      </div>

    </section>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  data: propTypes.shape({}),
}.isRequired;
