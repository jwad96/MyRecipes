import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal'
import LogoutButton from '../auth/LogoutButton';
import SignUpForm from '../auth/SignUpForm';

import "./NavBar.css";



const NavBar = () => {
  const user = useSelector(state => state.session.user)

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'red',
      color: 'white',
      borderRadius: '15px',
    },
  };

  Modal.setAppElement('#root');

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


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
            <button>Demo User</button>
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
