
// Inside LogoutButton.js
// Inside LogoutButton.js
import React from 'react';
import { logoutUser } from '../../Common/Services/AuthService';

const LogoutButton = ({ navigate }) => {
  const handleLogout = async () => {
    await logoutUser();
    localStorage.clear();
    navigate('/');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;


/*
// OLD LOGOUT BUTTON WORKING

// Inside LogoutButton.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../Common/Services/AuthService';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    localStorage.clear();
    navigate('/');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;

*/
