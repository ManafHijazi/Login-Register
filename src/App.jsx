import { useEffect, useState } from 'react';
import Login from './authentication/Login';
import SignUp from './authentication/SignUp';
import { Button } from '@material-ui/core';
import './App.scss';

const App = () => {
  const [user, setUser] = useState('');
  const [toggleForm, setToggleForm] = useState(true);

  const formMode = () => {
    setToggleForm(!toggleForm);
  };
  const userState = () => {
    const data = localStorage.getItem('user');
    const user = data !== null ? JSON.parse(data) : null;
    setUser(user);
  };
  useEffect(() => {
    userState();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  return (
    <>
      {user !== null ? (
        <>
          <div className='project-home-page'>
            <div className='page-content'>
              <div className='page-title'>Wellocome Logged in Successfully!</div>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </>
      ) : (
        <>
          {toggleForm ? (
            <Login loggedIn={(user) => setUser(user)} toggle={() => formMode()} />
          ) : (
            <SignUp toggle={() => formMode()} />
          )}
        </>
      )}
    </>
  );
};

export default App;
