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
    // <nav className="bg-white-800 border-b-2 border-gray-300">
    //   <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    //     <div className="relative flex h-16 items-center justify-between">
    //       <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
    //         <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
    //           <span className="absolute -inset-0.5"></span>
    //           <span className="sr-only">Open main menu</span>
    //           <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
    //             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    //           </svg>
    //           <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
    //             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    //           </svg>
    //         </button>
    //       </div>
    //       <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
    //         <div className="flex flex-shrink-0 items-center">
    //           <a href="/Dashboard" className="text-black text-lg xl:text-xl 2xl:text-2xl">StockSocial</a>
    //         </div>
    //         <div className="hidden sm:ml-6 sm:block">
    //           <div className="flex space-x-4">
    //             <a href="/Dashboard" className="text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Dashboard</a>
    //             <a href="/AboutUs" className="text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">About Us</a>
    //             <div className="text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" onClick={handleLogout}>Logout</div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/Dashboard">StockSocial</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
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