import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { BsFillCartPlusFill } from 'react-icons/bs';

import './ProductCard.css';
import formatCurrency from '../../utils/formatCurrency';
import AppContext from '../../context/AppContext';
import ModalEditProductButton from '../ModalEditProductButton/ModalEditProductButton';
import ModalEditProduct from '../ModalEditProduct/ModalEditProduct';

function ProductCard({ data }) {
  const { name, image, price } = data;
  const { cartItems, setCartItems } = useContext(AppContext);

  const handleAddCart = () => setCartItems([...cartItems, data]);

  // Verifique se 'image' é uma string antes de chamar 'replace'
  const imageUrl = typeof image === 'string' ? image.replace(/\w\.jpg/gi, 'W.jpg') : '';

  return (
    <section className="product-card">
      <img src={imageUrl} alt="product" className="card__image" />

      <div className="card__infos">
        <h2 className="card__price">{formatCurrency(price, 'BRL')}</h2>
        <h2 className="card__name">{name}</h2>
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
