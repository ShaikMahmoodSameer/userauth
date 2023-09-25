import axios from 'axios';
import React, { useEffect, useState } from 'react'

function CartItemsList({item, userId, cart}) {
    const [quantity, setQuantity] = useState(0);

  // Check if the item's test_id is already in the cart and set quantity
  useEffect(() => {
    const cartItem = cart.find((cartItem) => cartItem.test_id === item.test_id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
        // 
    }
  }, [cart, item.test_id]);

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
    updateCartItemQuantity(quantity + 1);
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateCartItemQuantity(quantity - 1);
    } else if (quantity === 1) {
      removeCartItem();
    }
  };

  // Function to update cart item quantity in the database
  const updateCartItemQuantity = (newQuantity) => {
    const data = { test_id: item.test_id, quantity: newQuantity, userId};
    axios.post("http://localhost:3500/updatecartitemquantity", data)
      .then((response) => {
        if (response.data.Status === "Success") {
          // 
        } else {
          console.log("err occurred while updating quantity");
        }
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
      });
  };

  // Function to remove cart item from the database
  const removeCartItem = () => {
    const data = { test_id: item.test_id, userId };
    axios.post("http://localhost:3500/removecartitem", data)
      .then((response) => {
        if (response.data.Status === "Success") {
          // 
        } else {
          console.log("err occurred while removing item");
        }
      })
      .catch((error) => {
        console.error("Error removing item:", error);
      });
  };

  return (
    <li key={item.id}>
        <span>{item.name} {item.price} </span>
        <button onClick={() => handleDecrementQuantity(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => handleIncrementQuantity(item.id)}>+</button>
        <span>${item.quantity * item.price}</span>
    </li>
  )
}

export default CartItemsList
