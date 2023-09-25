import React from 'react';
import '../styles/navbar.css';
import { Link } from 'react-router-dom';
import NavProfile from './NavProfile';

const Navbar = ({ 
  cartCount, 
  auth, 
  setAuth, 
  userId, 
  setUserId, 
  userName, 
  setUserName, 
  cartId, 
  setCartId, 
  message,
  handleLoginClick,
  handleLogout
}) => {
  return (
    <nav>
      <div className="nav_box">
        <Link to="/" className="btn btn-primanry">
          <span className="my_shop">
            My Shopping
          </span>
        </Link>
        <Link to="/tests" className="btn btn-primanry">
          <span className="">
            Tests
          </span>
        </Link>
        <Link to="/profile" className="btn btn-primanry">
          <span className="">
            Profile
          </span>
        </Link>
        <NavProfile 
          auth={auth} 
          setAuth={setAuth} 
          userId={userId} 
          setUserId={setUserId} 
          userName={userName} 
          setUserName={setUserName} 
          cartId={cartId} 
          setCartId={setCartId} 
          message={message} 
          handleLoginClick={handleLoginClick}
          handleLogout={handleLogout}
        />
        <div className="cart">
          <Link to="/cart">
            <span>
              <i className="fas fa-cart-plus"></i>
            </span>
            <span>{cartCount}</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
