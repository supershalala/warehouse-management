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
      console.log('Logged in successfully!', signIn);
      AuthService.login(signIn.token);
      window.location.reload();
    },
    onError(error) {
      console.error('Login error:', error.message);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    login({ variables: { phone, password } });
  };

  return (
    <div className="container mt-5" style={{ height: '82vh' }} >
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">Error: {error.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
