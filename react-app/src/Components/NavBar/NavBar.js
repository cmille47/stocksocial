// NavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../Common/Services/AuthService';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">StockSocial</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/AboutUs">About Us</Link>
            </li>
            <li className="nav-item">
              <span className="nav-link" onClick={handleLogout}>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





/*
import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../Logout/LogoutButton.js';

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">StockSocial</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/Dashboard">Dashboard</a>
                </li>
                
                <li class="nav-item">
                <a class="nav-link" href="/AboutUs">About Us</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Logout</a>
                </li>
                
            </ul>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;

*/