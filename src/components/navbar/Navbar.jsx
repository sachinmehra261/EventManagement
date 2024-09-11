import React, { useState } from "react";
import "./navbar.css";
import logo from "../../assets/images/logo.png";
import { CiMenuBurger } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import SideMenu from "../sidemenu/SideMenu";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { IoSunnyOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const username = localStorage.getItem('userName')

  function handleLogout(){
    navigate('/login')
    localStorage.setItem('isLoggedIn',Boolean(false))
    localStorage.setItem('userName','')
    localStorage.setItem('userId','')
  }

  return (
    <>
      <div className="nav-main-container">
        <div id="nav-sub-container">
          {showMenu ? (
            <button id="menu-logo" onClick={() => setShowMenu(false)} title="menu">
              <CiMenuBurger />
            </button>
          ) : (
            <button id="menu-logo" onClick={() => setShowMenu(true)} title="menu">
              <CiMenuBurger />
            </button>
          )}
          <NavLink to='/'><img src={logo} alt="logo" id="logo" /></NavLink>
          <ul>
            <NavLink to='/' className='navlink' id="home"><li>Home</li></NavLink>
            <NavLink to='#' className='navlink' id="about"><li>About</li></NavLink>
            <NavLink to='/orders' className='navlink' id="contact"><li>My Orders</li></NavLink>
            <NavLink to='/addEvent' className='navlink' id="listevent" >
            <li style={{display: localStorage.getItem('isLoggedIn')=='false' ?'none':''}}>List your event</li></NavLink>
          </ul>
        </div>
        <div id="nav-search-bar-container">
          <input type="text" placeholder="search" id="nav-search-bar" />
          <span id="nav-search-logo">
            <FaSearch />
          </span>
        <p id="greet-user">{localStorage.getItem('isLoggedIn')=='true' ? `Hello, ${username}` : 'Welcome, Guest'}</p>
          {isDarkMode ? (
            <span className="mode" onClick={() => setIsDarkMode(false)}>
              <MdOutlineDarkMode />
            </span>
          ) : (
            <span className="mode" onClick={() => setIsDarkMode(true)}>
            <IoSunnyOutline />
            </span>
          )}
        </div>
        <button id="logout-btn" onClick={handleLogout}>{localStorage.getItem('isLoggedIn')=='false' ? 'Login/Signup' : 'Logout'}</button>
      </div>
      <SideMenu showMenu={showMenu} setShowMenu={setShowMenu} />
    </>
  );
}

export default Navbar;
