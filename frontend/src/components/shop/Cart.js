import React from 'react';
import CartItemsList from './CartItemsList';

function Cart({ cart, userId }) {

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <CartItemsList key={item.id} item={item} userId={userId} cart={cart} />
        ))}
      </ul>
      <div>
        <h3>Total: ${calculateTotal()}</h3>
      </div>
    </div>
  );
}

export default Cart;
