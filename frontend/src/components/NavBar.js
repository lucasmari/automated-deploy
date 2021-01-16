import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from './logo.png';
import './../styles/NavBar.css';
import SignIn from './SignIn';
import { AUTH_TOKEN } from '../constants';

const NavBar = () => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
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
      {authToken ? (
        <Link
          className="signout"
          onClick={() => {
            localStorage.removeItem(AUTH_TOKEN);
          }}
          to="/"
        >
          Sign Out
        </Link>
      ) : (
        <SignIn />
      )}
    </ul>
  );
};

export default NavBar;
