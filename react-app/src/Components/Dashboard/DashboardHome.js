import React, { useState, useEffect } from 'react';
import ProtectedRoute from '../../Common/Services/ProtectedRoute';
import DashboardGood from './DashboardGood';

export default function Dashboard() {
  const [userID, setUserID] = useState('')

  useEffect(() => {
    if (localStorage.getItem('user')) {
      console.log('authorized user')
      const user = JSON.parse(localStorage.getItem('user'));
      setUserID(user.objectId);
    } else {
      console.log('unauthorized');
    }
  }, []);

  return (
    <div>
      <ProtectedRoute
        path={`/dashboard/${userID}`}
        element={DashboardGood}
      />
    </div>

  );
}