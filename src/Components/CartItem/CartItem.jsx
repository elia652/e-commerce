import React, { useContext } from 'react';
import './index.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/Frontend_Assets/cart_cross_icon.png';
const CartItem = () => {
  const { getTotalValue, removeFromCart, all_product, cartItems } =
    useContext(ShopContext);
  return (
    <div className="cartItems">
      <div className="cartItems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div>
              <div className="cartItems-format-main cartItems-format">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p style={{ fontSize: '12px' }}>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartItems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img
                  className="cartItems-remove-cart"
                  src={remove_icon}
                  onClick={() => removeFromCart(e.id)}
                  alt=""
                />
              </div>
            </div>
          );
        }
        return null;
      })}
      <div className="cartItems-down">
        <div className="cartItems-total">
          <h1>Cart totals</h1>
          <div className="cartItems-total-items">
            <p>Subtotal</p>
            <p>${getTotalValue()}</p>
          </div>
          <hr />
          <div className="cartItems-total-items">
            <p>Shipping free</p>
            <p>Free</p>
          </div>
          <hr />
          <div className="cartItems-total-items">
            <h3>Total</h3>
            <p>${getTotalValue()}</p>
          </div>
          <button className="cartItems-total-button">
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cartItems-promocode">
          <p>If you have a promocode, Enter it here!</p>
          <div className="cartItems-promobox">
            <input type="text" placeholder="promocode" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
