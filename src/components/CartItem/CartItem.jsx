// Em CartItem.js
import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import { BsCartDashFill, BsChevronUp, BsChevronDown } from 'react-icons/bs';

import './CartItem.css';
import formatCurrency from '../../utils/formatCurrency';
import AppContext from '../../context/AppContext';

function CartItem({ data, setTotalPrice }) {
  const { cartItems, setCartItems } = useContext(AppContext);
  const { id, image, name, price, quantity, itemQuantity } = data;

  const appUrl = 'http://localhost:8080';

  const handleRemoveItem = () => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
  };

  const handleIncreaseQuantity = () => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        let soma = item.itemQuantity + 1;
        if(soma > quantity)
          return item;
        return item.id === id ? { ...item, itemQuantity: soma } : item;
      })
    );
  };

  const handleDecreaseQuantity = () => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        let sub = item.itemQuantity - 1;
        if(sub < 1)
          return item;
        return item.id === id ? { ...item, itemQuantity: sub } : item;
      })
    );
  };

  useEffect(() => {
    // Atualizar o total aqui, se necessário
  }, [itemQuantity, price, setTotalPrice]);

  const imageUrl = typeof image === 'string' ? `${appUrl}/image/${image}` : `${appUrl}/image/d780bb11-f449-4863-aaf6-d874866e0e3c.jpg`;

  return (
    <section className="cart-item">
      <img src={imageUrl} alt="imagem do produto" className="cart-item-image" />

      <div className="cart-item-content">
        <h3 className="cart-item-name">{name}</h3>
        <h3 className="cart-item-price" data-price={price}>
          {formatCurrency(price * itemQuantity, 'BRL')}
        </h3>

        <div className="cart-item-quantity">
          <button className="quantity-button" onClick={handleDecreaseQuantity}>
            <BsChevronDown />
          </button>
          <span className="quantity">{itemQuantity}</span>
          <button
            className="quantity-button"
            onClick={handleIncreaseQuantity}
            data-quantity={itemQuantity}
          >
            <BsChevronUp />
          </button>
        </div>
        <button
          type="button"
          className="button__remove-item"
          onClick={handleRemoveItem}
        >
          <BsCartDashFill />
        </button>
      </div>
    </section>
  );
}

CartItem.propTypes = {
  data: propTypes.object.isRequired,
  setTotalPrice: propTypes.func.isRequired,
};

export default CartItem;
