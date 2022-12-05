import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { signUp } from '../../store/session';

import "./SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const history =  useHistory();
  const location = useLocation();

  // const params = new URLSearchParams(location.search.slice(1));
  // if (params.get('redirectTo')) {
  //   return <Redirect to={params.get("redirectTo")} />
  // }

  console.log(errors)

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(errors => ({...errors, password: "passwords do not match"}))
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    const params = new URLSearchParams(location.search.slice(1));
    if (params.get('redirectTo')) {
      return <Redirect to={params.get("redirectTo")} />
    }
    return  <Redirect to='/' />;
  }

  return (
    <div id="signup-form-wrapper">
      <h2 id="signup-form-header">Sign Up</h2>
      <form id="signup-form" onSubmit={onSignUp}>
        <div className="signup-form-field-wrapper">
          <label>User Name{errors.username && <span className="signup-form-error">  {errors.username}</span>}</label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            required={true}
            maxLength={40}
          ></input>
        </div>
        <div className="signup-form-field-wrapper">
          <label>Email{errors.email && <span className="signup-form-error">  {errors.email}</span>}</label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            required={true}
            maxLength={255}
          ></input>
        </div>
        <div className="signup-form-field-wrapper">
          <label>Password{errors.password && <span className="signup-form-error">  {errors.password}</span>}</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            required={true}
            maxLength={40}
          ></input>
        </div>
        <div className="signup-form-field-wrapper">
          <label>Repeat Password</label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            maxLength={40}
          ></input>
        </div>
        <button id="signup-form-submit" type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
