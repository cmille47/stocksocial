import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewLeague from './NewLeague';

export default function League() {
  return (
    <section className="league-container">
      <h1>Create your League!</h1>
      <NewLeague />
    </section>
  );
}
