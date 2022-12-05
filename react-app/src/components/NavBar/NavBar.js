import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import {useHistory, useLocation} from "react-router";
import Modal from 'react-modal'
import LogoutButton from '../auth/LogoutButton';
import SignUpForm from '../auth/SignUpForm';
import { login } from '../../store/session';

import "./NavBar.css";



const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleDemoSignIn = () => {
    dispatch(login("demo@aa.io", "password"))
  }

  const handleAddRecipe = () => {
    history.push("/recipes/new");
  }

  return (
    <nav id="navbar-navbar">
      <NavLink to='/' exact={true} id='navbar-home-link'>
        <button id="navbar-home">Home</button>
      </NavLink>
      <ul id="navbar-right-links">
        {
          !user && 
          <li>
            <button onClick={handleDemoSignIn}>Demo User</button>
          </li>
        }
        {
          !user && 
          <li>
            <NavLink to={`/login?redirectTo=${location.pathname}`} exact={true}>
              <button id="navbar-login">Login</button>
            </NavLink>
          </li>
        }
        {
          !user && 
          <li>
            <NavLink to='/sign-up' exact={true}>
              <button id="navbar-signup">Sign Up</button>
            </NavLink>
          </li>
        }
        {
          user && 
          <li>
            <button id="navbar-add-recipe" onClick={handleAddRecipe}>Add Recipe</button>
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
