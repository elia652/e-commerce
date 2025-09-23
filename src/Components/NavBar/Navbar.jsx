import React, { useContext, useRef, useState } from 'react';
import './NavBar.css';
import logo from '../Assets/Frontend_Assets/logo.png';
import cart_icon from '../Assets/Frontend_Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/Frontend_Assets/dropdown_icon.png';
const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const { getTotal } = useContext(ShopContext);
  const menuRef = useRef();
  const dropdownToggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };
  return (
    <div className="navBar">
      <div className="nav-logo">
        <Link
          to="/"
          style={{
            display: 'flex',
            textDecoration: 'none',
            alignItems: 'center',
          }}
        >
          <img src={logo} alt="" />
          <p className="shopper">SHOPPER</p>
        </Link>
      </div>
      <img
        src={nav_dropdown}
        alt=""
        className="dropdown"
        onClick={dropdownToggle}
      />
      <ul className="nav-menu" ref={menuRef}>
        <li onClick={() => setMenu('shop')}>
          <Link to="/" style={{ textDecoration: 'none', color: '#626262' }}>
            Shop
          </Link>
        </li>
        <li onClick={() => setMenu('men')}>
          <Link style={{ textDecoration: 'none', color: '#626262' }} to="/men">
            Men
          </Link>
        </li>
        <li onClick={() => setMenu('women')}>
          <Link
            style={{ textDecoration: 'none', color: '#626262' }}
            to="/women"
          >
            Women
          </Link>
        </li>
        <li onClick={() => setMenu('kids')}>
          <Link style={{ textDecoration: 'none', color: '#626262' }} to="/kid">
            Kids
          </Link>
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link style={{ textDecoration: 'none' }} to="/login">
          <button>Login</button>
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotal()}</div>
      </div>
    </div>
  );
};

export default Navbar;
