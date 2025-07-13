import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { MdRemoveShoppingCart } from "react-icons/md";

import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemsToCart,
  removeItemFromCart,
} from "../../actions/cartAction.js";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    } else {
      dispatch(addItemsToCart(id, newQty));
    }
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    } else {
      dispatch(addItemsToCart(id, newQty));
    }
  };

  const checkoutHandler = () => {
    navigate("/shipping")
  }

  return (
    <>
      {cartItems.length !== 0 ? (
        <div className="cartPage">
          <div className="cartHeader">
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>

          {cartItems &&
            cartItems.map((item) => (
              <div className="cartContainer">
                <CartItemCard
                  item={item}
                  key={item}
                  removeItemFromCart={removeItemFromCart}
                />
                <div className="cartInput">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.product, item.quantity)
                    }
                  >
                    -
                  </button>
                  <input type="number" value={item.quantity} readOnly />
                  <button
                    onClick={() =>
                      increaseQuantity(item.product, item.quantity, item.stock)
                    }
                  >
                    +
                  </button>
                </div>
                <p className="cartSubtotal">₹{item.price * item.quantity}</p>
              </div>
            ))}

          <div className="cartTotal">
            <div></div>
            <div className="grossProfitBox">
              <p>Gross Total</p>
              <p>{`₹ ${cartItems.reduce(
                (acc, item) => acc + (item.quantity * item.price), 0
              )}`}</p>
            </div>
            <div></div>
            <div className="checkoutBtn">
              <button onClick={checkoutHandler}>Checkout</button>
            </div>
          </div>
        </div>
      ) : (
        <div id="emptyCart">
          <div id="shopcart">
            <MdRemoveShoppingCart />
          </div>
          <div id="ec">Cart is empty</div>
          <Link to="/products">PRODUCTS</Link>
        </div>
      )}
    </>
  );
};

export default Cart;
