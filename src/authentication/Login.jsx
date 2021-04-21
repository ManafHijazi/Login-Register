import React, { useState } from 'react';
import { Link, Button, Checkbox, Typography, FormControlLabel } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ToastContainer, toast } from 'react-toastify';
import { BarLoader } from 'react-spinners';
import fire from '../helpers/db';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberme, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleCheck = (event) => {
    setRememberMe(event.target.checked);
  };
  const handlerLogin = () => {
    setLoading(true);
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const { user } = response;
        const data = {
          userId: user.uid,
          email: user.email,
        };
        localStorage.setItem('user', JSON.stringify(data));
        const storage = localStorage.getItem('user');
        const loggedInUser = storage !== null ? JSON.parse(storage) : null;
        props.loggedIn(loggedInUser);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };
  return (
    <div class='limiter'>
      <div class='container-login'>
        <div class='wrap-login'>
          <div class='login-pic' data-tilt>
            <div className='form-logo' />
          </div>
          <ToastContainer />
          <div className='login-form-wrapper'>
            <Typography component='h1' variant='h6'>
              Sign In
            </Typography>
            <ValidatorForm
              onSubmit={handlerLogin}
              onError={(errors) => {
                for (const err of errors) console.log(err.props.errorMessages[0]);
              }}>
              <TextValidator
                label='Email'
                name='email'
                value={email}
                margin='normal'
                variant='outlined'
                onChange={handleEmail}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
              />
              <TextValidator
                label='Password'
                name='password'
                type='password'
                value={password}
                variant='outlined'
                onChange={handlePassword}
                validators={['required']}
                errorMessages={['this field is required']}
              />
              <div className='form-footer'>
                <FormControlLabel
                  control={
                    <Checkbox value={rememberme} onChange={(e) => handleCheck(e)} color='primary' />
                  }
                  label='Remember me'
                />
                {loading ? (
                  <BarLoader loading={loading} />
                ) : (
                  <Button type='submit' fullWidth variant='contained'>
                    Sign In
                  </Button>
                )}
              </div>
              <div className='form-sign-up'>
                <Link onClick={props.toggle} variant='body2'>
                  Don't have an account? Sign Up
                </Link>
              </div>
            </ValidatorForm>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
