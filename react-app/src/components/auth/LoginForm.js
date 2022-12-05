import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

import {useHistory, useLocation} from "react-router";

import "./LoginForm.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    console.log("HERE'S YOUR FUCKIN DATA", data);
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    const params = new URLSearchParams(location.search.slice(1));
    if (params.get('redirectTo')) {
      return <Redirect to={params.get("redirectTo")} />
    }
    
    return <Redirect to='/' />;
  }

  return (
    <div id="login-form-wrapper">
      <h2 id="login-form-header">Log In</h2>
      <form id="login-form" onSubmit={onLogin}>
        <div>
          {/* {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))} */}
        </div>
        <div className="login-form-field">
          <label htmlFor='email'>Email{errors.email && <span className="login-form-error">{`  ${errors.email}`}</span>}</label>
          <input
            name='email'
            type='text'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className="login-form-field">
          <label htmlFor='password'>Password{errors.password && <span className="login-form-error">{`  ${errors.password}`}</span>}</label>
          <input
            name='password'
            type='password'
            value={password}
            onChange={updatePassword}
          />
          <button id="login-form-submit" type='submit'>Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
