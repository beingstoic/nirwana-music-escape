import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUserAPICall, userRegistrationAPICall } from '../../redux/users/userActions';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './login.css';

const LoginComp = ({ userData, loginUserAPICall }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  let navigate = useNavigate();


  useEffect(() => {
    if (userData.user.data && userData.user.userLoggedIn === true) {
      if (userData.user.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else if (userData.user.error) {
      setErrorMessage('Error: ' + userData.user.error);
    }
  }, [userData]);

  const handleSubmit = async event => {
    event.preventDefault();
    const loginObj = {
      userName: email,
      password: password
    };
    loginUserAPICall(loginObj);
  };

  const handleChange = event => {
    const { value, name } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleRequest = () => {
    navigate("/register");
  };

  return (
    <div className='Auth-form-container'>
      <div className='spaces'>
      <h1>Sign in with your email and password</h1>
      <CustomButton onClick={handleRequest}> Or Register </CustomButton>
      </div>

      <form onSubmit={handleSubmit} className='Auth-form'>
        <div className="Auth-form-content">

          <FormInput
            name='email'
            type='email'
            handleChange={handleChange}
            value={email}
            label='Enter User Name'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={password}
            handleChange={handleChange}
            label='Enter Password'
            required
          />
          {errorMessage && (
            <p className="error"> {errorMessage} </p>
          )}
          <div className='buttons'>
            <CustomButton type='submit'> Sign in </CustomButton>
            {/* <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign in with Google
            </CustomButton> */}
          </div>
        </div>
      </form>
    </div>
  );

};

const mapStateToProps = state => {
  return {
    userData: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUserAPICall: (obj) => dispatch(loginUserAPICall(obj)),
    userRegistrationAPICall: (obj) => dispatch(userRegistrationAPICall(obj))

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComp);