import React, { useEffect, useState } from 'react';
import { Typography, Button, Link } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import fire from '../helpers/db';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPassowerd = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleSignUp = () => {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        if (response) {
          props.toggle();
          toast.success('User Registered Successfully');
        }
      })
      .catch((error) => {
        // eslint-disable-next-line default-case
        switch (error.code) {
          case 'auth/email-already-in-use':
            toast.error(error.message);
            break;
          case 'auth/invalid-email':
            toast.error(error.message);
            break;
          case 'auth/weak-password':
            toast.error(error.message);
            break;
        }
      });
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== password) {
        return false;
      }
      return true;
    });
    return () => {
      ValidatorForm.removeValidationRule('isPasswordMatch');
    };
  }, [password]);

  return (
    <div class='limiter'>
      <div class='container-login'>
        <div class='wrap-login'>
          <div class='login-pic' data-tilt>
            <div className='form-logo' />
          </div>
          <div className='login-form-wrapper'>
            <Typography component='h1' variant='h6'>
              Sign Up
            </Typography>
            <ValidatorForm
              onSubmit={handleSignUp}
              onError={(errors) => {
                for (const err of errors) console.log(err.props.errorMessages[0]);
              }}>
              <TextValidator
                variant='outlined'
                margin='normal'
                fullWidth
                label='Email'
                onChange={handleEmail}
                name='email'
                value={email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
                autoComplete='off'
              />
              <TextValidator
                variant='outlined'
                label='Password'
                onChange={handlePassword}
                name='password'
                type='password'
                value={password}
                validators={['required']}
                errorMessages={['this field is required']}
                autoComplete='off'
              />
              <TextValidator
                variant='outlined'
                label='Confirm password'
                onChange={handleConfirmPassowerd}
                name='confirmPassword'
                type='password'
                validators={['isPasswordMatch', 'required']}
                errorMessages={['password mismatch', 'this field is required']}
                value={confirmPassword}
                autoComplete='off'
              />
              <div className='form-footer'>
                <Button type='submit' variant='contained'>
                  Sign Up
                </Button>
              </div>
              <div className='form-sign-up'>
                <Link onClick={props.toggle} variant='body2'>
                  Already have an account? Sign In
                </Link>
              </div>
            </ValidatorForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
