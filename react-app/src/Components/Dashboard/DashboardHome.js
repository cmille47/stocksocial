import React from 'react';
import ProtectedRoute from '../../Common/Services/ProtectedRoute';
import DashboardGood from './DashboardGood';

export default function Dashboard() {
  return (
    <div>
      <ProtectedRoute path={`/dashboard`} element={DashboardGood} />
    </div>
  );
}
