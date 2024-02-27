import React from 'react';
import CartButton from '../CartButton/CartButton';
import ModalAddProductButton from '../ModalAddProductButton/ModalAddProductButton';
import ModalAddProduct from '../ModalAddProduct/ModalAddProduct';

import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <ModalAddProductButton />
        <ModalAddProduct />
        <CartButton />        
      </div>
    </header>
  );
}

export default Header;
