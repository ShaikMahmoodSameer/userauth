import "./App.css";
import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./components/Home";
import Register from "./components/Register";
import { Login } from "./components/Login";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Cart from "./components/shop/Cart";
import Tests from "./components/shop/Tests";
import axios from "axios";
import LogPopup from "./components/LogPopup";
import ResetPassword from "./components/ResetPassword";

function App() {
  const [auth, setAuth] = useState(false);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [cartId, setCartId] = useState('');
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [message, setMessage] = useState('');
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:3500/user")
      .then((res) => {
        if (res.data.Status === "ok") {
          setAuth(true);
          setUserId(res.data.userid);
          setUserName(res.data.username);
          setCartId(res.data.cart_id)
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch((err) => {
        console.error("Axios error:", err);
      });
  }, [setAuth, setUserId, setMessage, setUserName, setCartId]);
  // console.log(userId);

  useEffect(() => {
    axios.get(`http://localhost:3500/cart/${cartId}/tests`)
    .then((response) => {
      setCart(response.data.cartItems);
        setCartCount(cart.length);
      })
      .catch((error) => {
        console.error('Error fetching tests:', error);
      });
  }, [cartId, cart]);

  const handleLogout = () => {
    axios.get('http://localhost:3500/logout')
      .then(() => {
        setAuth(false);
      })
      .catch(err => {
        console.log(err);
      });
  }
  // ------------------------------------------------
  const [isShowLogin, setIsShowLogin] = useState(false);

  const handleLoginClick = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin);
  };
  // ------------------------------------------------

  return (
    <div>
      <Router>
        <Navbar 
          cartCount={cartCount} 
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
        <Routes>
          <Route exact path="/" element={ <Home 
            userId={userId}
            cart={cart} 
            setCart={setCart} 
          />} />
          <Route exact path="/tests" element={<Tests 
            userId={userId}  
            cart={cart} 
            setCart={setCart}
          />} />
          <Route path="/register" element={ <Register /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/reset-password" element={ <ResetPassword /> } />
          <Route path="/Profile" element={ <Profile userId={userId} /> } />
          <Route path="/cart" element={ <Cart cart={cart} userId={userId} setCart={setCart} /> } />
        </Routes>
        <LogPopup isShowLogin={isShowLogin} handleLoginClick={handleLoginClick} />
      </Router>
      {/* {warning && <div className="warning">Item is already added to your cart</div>} */}
      
    </div>
  );
}


export default App;
