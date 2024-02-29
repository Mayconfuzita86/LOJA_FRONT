import React, { useContext, useState } from 'react';
import propTypes from 'prop-types';
import { BsFillCartPlusFill } from 'react-icons/bs';

import './ProductCard.css';
import formatCurrency from '../../utils/formatCurrency';
import AppContext from '../../context/AppContext';
import ModalEditProductButton from '../ModalEditProductButton/ModalEditProductButton';
import ModalEditProduct from '../ModalEditProduct/ModalEditProduct';

function ProductCard({ data }) {
  const { name, image, price, quantity } = data;
  console.log(data);
  const { cartItems, setCartItems } = useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const appUrl = 'http://localhost:8080';

  const handleAddCart = () => {

    if (data.quantity === 0) {
      console.log('Quantidade indisponível');
      return;
    }
    //verifica se ja existe o item no carrinho
    const isItemInCart = cartItems.some((item) => item.id === data.id);
  
    if (!isItemInCart) {
      const updatedData = { ...data, itemQuantity: 1 };
      setCartItems([...cartItems, updatedData]);
    } else {
      console.log('Este item já está no carrinho');
    }
  };

  const handleEditModal = () => {
    setSelectedProduct(data);
  };
  

  // seta imagem carregada ou imagem default para produtos sem imagem
  const imageUrl = typeof image === 'string' ? `${appUrl}/image/${image}` : `${appUrl}/image/d780bb11-f449-4863-aaf6-d874866e0e3c.jpg`;

  return (
    <section className="product-card">
      <img src={imageUrl} alt="product" className="card__image" />

      <div className="card__infos">
        <h2 className="card__price">{formatCurrency(price, 'BRL')}</h2>
        <h2 className="card__name">{name}</h2>
        <p className="card__stock">{quantity === 0 ? 'INDISPONÍVEL' : `Estoque: ${quantity} unidade(s)`}</p>       
      </div>

      <div className="card__buttons">
        <button type="button" className="button__add-cart" onClick={handleAddCart}>
          <BsFillCartPlusFill />
        </button>
        
      </div>
      <div className="card__buttons">
        <button type="button" className="button__edit-cart"  onClick={handleEditModal}>
          <ModalEditProductButton selectedProduct={selectedProduct} />
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
