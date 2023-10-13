import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUserPortfolios } from '../../Common/Services/PortolioService';

export default function Dashboard() {
  // hardcoded user ID for now
  const [userID, setUserID] = useState('0FQxcgrfwH')
  const [portfolios, setPortfolios] = useState([])

  useEffect(() => {
    getAllUserPortfolios(userID).then((result) => {
      setPortfolios(result);
    });
  }, []);

  return (
    <section>
      <h1>Welcome to the Dashboard component</h1>
      <p>This is the Dashboard component</p>

      <Link to="/create-league">
        <button>Create League</button>
      </Link>
      <br />
      Portfolios:
      {portfolios.length > 0 && (
        <ul>
          {portfolios.map((portfolio) => (
            <li key={portfolio.id}>
              <a href={`/Portfolio/${encodeURIComponent(portfolio.get("PortfolioName"))}/${portfolio.id}`}>
                {portfolio.get("PortfolioName")}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}