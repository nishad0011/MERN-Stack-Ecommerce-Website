import React from "react";
import "./CartItemCart.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const CartItemCard = ({ item, removeItemFromCart }) => {
  const dispatch = useDispatch();

  const removeItemCartHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };
  return (
    <>
      <div className="CartItemCard">
        <img src={item.image} alt="product image" />
        <div>
          <Link to={`/product/${item.product}`}>{item.name}</Link>
          <span>{`Price : ₹${item.price}`}</span>
          <p onClick={() => removeItemCartHandler(item.product)}>Remove</p>
        </div>
      </div>
    </>
  );
};

export default CartItemCard;
