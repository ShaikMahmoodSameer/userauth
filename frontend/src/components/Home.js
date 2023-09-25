import React from 'react';
import Tests from './shop/Tests';

function Home({ 
  handleClick, 
  userId, 
  cart, 
  setCart,
  
 }) {
  return (
    <div className='container mt-4'>
      <Tests 
        userId={userId} 
        cart={cart} 
        setCart={setCart} 
        handleClick={handleClick} 
        
      />
    </div>
  )
}

export default Home