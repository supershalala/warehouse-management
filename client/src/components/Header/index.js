import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../utils/auth'; 

function Header() {
  const isAuthenticated = AuthService.loggedIn();

  const handleLogout = () => {
    AuthService.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link className="navbar-brand col-4 pl-0 mr-0" to="/">Warehouse Management</Link>
      <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navigations-09" aria-expanded="false">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse justify-content-md-center col-8 px-0 collapse" id="navigations-09">
      <ul className="navbar-nav col-6 justify-content-center">
          {isAuthenticated && <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
            <Link className="nav-link" to="/staffmanagement">Staff Management</Link>
          </li>}
        </ul>
        <div className="col-6 text-lg-right px-0">
          {!isAuthenticated && <Link className="btn btn-outline-primary mt-2 mt-lg-0 mr-0" to="/signup">Sign up</Link>}
          {!isAuthenticated && <Link className="btn btn-outline-primary mt-2 mt-lg-0 mr-0 ml-2" to="/login">Login</Link>}
          {isAuthenticated && <button className="btn btn-outline-primary mt-2 mt-lg-0 mr-0 ml-2" onClick={handleLogout}>Logout</button>}
        </div>
      </div>
    </nav>
  );
}

export default Header;
