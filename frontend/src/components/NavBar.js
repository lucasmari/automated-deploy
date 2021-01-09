import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from './logo.png';
import './../styles/NavBar.css';
import SignIn from './SignIn';
import SignUp from './SignUp';

const NavBar = () => {
  return (
    <ul className="nav">
      <Link className="home-img" to="/">
        <img src={logo} alt="Logo" />
      </Link>
      <Link className="home" to="/">
        Easter Egg
      </Link>
      <NavLink className="games-nav" to="/games">
        Games
      </NavLink>
      <NavLink className="contact-nav" to="/contact">
        Contact
      </NavLink>
      <NavLink className="about-nav" to="/about">
        About
      </NavLink>
      <div className="search-container">
        <form>
          <input type="text" placeholder="Search..." name="search"></input>
          <button type="submit">
            <em className="fa fa-search"></em>
          </button>
        </form>
      </div>
      <SignIn />
      <SignUp />
    </ul>
  );
};

export default NavBar;
