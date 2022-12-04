import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal'
import LogoutButton from '../auth/LogoutButton';
import SignUpForm from '../auth/SignUpForm';
import { login } from '../../store/session';

import "./NavBar.css";



const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleDemoSignIn = () => {
    dispatch(login("demo@aa.io", "password"))
  }

  return (
    <nav id="navbar-navbar">
      <NavLink to='/' exact={true} id='navbar-home-link'>
        Home
      </NavLink>
      <ul id="navbar-right-links">
        {
          !user && 
          <li>
            <NavLink to='/login' exact={true}>
              Login
            </NavLink>
          </li>
        }
        {
          !user && 
          <li>
            <button onClick={handleDemoSignIn}>Demo User</button>
          </li>
        }
        {
          !user && 
          <li>
            <NavLink to='/sign-up' exact={true}>
              Sign Up
            </NavLink>
          </li>
        }
        {
          user && 
          <li>
            <button>Add Recipe</button>
          </li>
        }
        {
          user && 
          <li>
            <LogoutButton />
          </li>
        }
      </ul>
    </nav>
  );
}

export default NavBar;
