import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'

function LogPopup({ isShowLogin, handleLoginClick }) {
    const [showLogin, setShowLogin] = useState(true)    
    // const [showRegister, setShowRegister] = useState(false) 

    return (
      <div className={`${isShowLogin ? "active" : ""} show popupbox mx-auto w-100 h-100 d-flex align-items-center justify-content-center`}>
        {showLogin ? <Login setShowLogin={setShowLogin} handleLoginClick={handleLoginClick} /> : <Register setShowLogin={setShowLogin} handleLoginClick={handleLoginClick} />}
      </div>
  )
}
export default LogPopup
