import React, { useState } from 'react'
// import './Header.css';

const Header = () => {

    const [active, setActive] = useState('home');

    const handleClick = (item) => {
        setActive(item)
    }

  return (

    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      {/* Brand */}
      <h2 className="navbar-brand" style={{ fontSize: '25px' ,fontFamily: 'Times New Roman, Times, serif' }}>NEWone</h2>
      
      {/* <!-- Toggle button for collapsing the navbar on smaller screens --> */}
      {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button> */}
      
      {/* <!-- Navbar links --> */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto ml-2" style={{ fontSize: '20px' ,fontFamily: 'Courier New, Courier, monospace' }}>
          <li className={`nav-item ${active === 'home' ? 'active' : ""}`} >
            <a className="nav-link"  aria-current="page" href="/" onClick={() => handleClick('home')}>Home</a>
          </li>
          <li className={`nav-item ${active === 'login' ? 'active' : ""}`} >
            <a className="nav-link"  aria-current="page" href="/login" onClick={() => {handleClick('login')}}>Login</a>
          </li>
          <li className={`nav-item ${active === 'register' ? 'active' : ""}`} >
            <a className="nav-link"  href="/register" onClick={() => {handleClick('register')}}>Register</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    </div>
  )
}

export default Header
