import React, { useContext } from 'react';
import './Cart.css';
import CartItem from '../CartItem/CartItem';
import AppContext from '../../context/AppContext';
import formatCurrency from '../../utils/formatCurrency';
import FinalizeCartButton from '../FinalizeCartButton/FinalizeCartButton';


function Cart() {
  const { cartItems, isCartVisible } = useContext(AppContext);

  const totalPrice = cartItems.reduce((acc, item) => item.price + acc, 0);

  return (
    <section className={`cart ${isCartVisible ? 'cart--active' : ''}`}>
      <div className="cart-items">
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} data={cartItem} />
        ))}
      </div>
      <div className="cart-resume"><h5>Total:</h5>{formatCurrency(totalPrice, 'BRL')}</div>

      {cartItems.length > 0 && <FinalizeCartButton />}
    </section>
  );
}

export default Cart;

