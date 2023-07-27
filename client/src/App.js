

import React, { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StaffManagement from './pages/StaffManagement';

import HomePage from './pages/Homepage';

import AuthService from './utils/auth';


const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(AuthService.loggedIn());
  }, []);

  const handleLogin = (token) => {
    // Save the token to local storage or use your AuthService implementation
    localStorage.setItem('id_token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Remove the token from local storage or use your AuthService implementation
    localStorage.removeItem('id_token');
    setIsAuthenticated(false);
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        
          <Routes>

          <Route path="/" element={<HomePage />} />

            <Route
              path="/signup"
              element={<Signup onLogin={handleLogin} />}
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/staffmanagement"
              element={
                isAuthenticated ? (
                  <StaffManagement />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
