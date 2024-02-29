import React, { useContext, useEffect, useState } from 'react';
import './Cart.css';
import CartItem from '../CartItem/CartItem';
import AppContext from '../../context/AppContext';
import formatCurrency from '../../utils/formatCurrency';
import FinalizeCartButton from '../FinalizeCartButton/FinalizeCartButton';

function Cart() {
  const { cartItems, isCartVisible } = useContext(AppContext);
  const [totalPrice, setTotalPriceLocal] = useState(0);

  useEffect(() => {
    const newTotalPrice = cartItems.reduce(
      (acc, item) => item.price * item.itemQuantity + acc,
      0
    );
    setTotalPriceLocal(newTotalPrice);
  }, [cartItems]);

  return (
    <section className={`cart ${isCartVisible ? 'cart--active' : ''}`}>
      <div className="cart-items">
        {cartItems.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            data={cartItem}
            setTotalPrice={setTotalPriceLocal}
          />
        ))}
      </div>
      <div className="cart-resume">
        <h5>Total:</h5>
        {formatCurrency(totalPrice, 'BRL')}
      </div>

      {cartItems.length > 0 && <FinalizeCartButton />}
    </section>
  );
}

export default Cart;
