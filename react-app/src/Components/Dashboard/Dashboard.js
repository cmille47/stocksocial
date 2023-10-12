import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <section>
      <h1>Welcome to the Dashboard component</h1>
      <p>This is the Dashboard component</p>

      <Link to="/create-league">
        <button>Create League</button>
      </Link>
    </section>
  );
}
