import React from 'react';
import { useNavigate } from "react-router-dom"; // useHistory
import NewLeague from "./NewLeague";

export default function League() {

  return (
    <section>
      <h1>Create your League!</h1>
      <p>This is the League component</p>
      <NewLeague />
    

    </section>
  );
}