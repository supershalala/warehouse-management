import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNIN_USER } from '../utils/mutations';
import AuthService from '../utils/auth';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [login, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted({ signIn }) {
      console.log('Token:', signIn.token);
      // Handle successful login here
      console.log('Logged in successfully!', signIn);
      // Save the token to local storage using AuthService method
      AuthService.login(signIn.token);
      // Reload the page to take effect
      window.location.reload();
    },
    onError(error) {
      // Handle error during login
      console.error('Login error:', error.message);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Call the login mutation with the provided phone and password
    login({ variables: { phone, password } });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default Login;
