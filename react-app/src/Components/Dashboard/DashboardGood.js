

// NO BACKGROUND IMAGE

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  updatePortfolioCurrentValue,
  getAllUserPortfoliosWithLeagueNames,
  getPortfolioCurrentValue
} from '../../Common/Services/PortfolioService';

import { updatePortfolioPositions } from '../../Common/Services/PositionService';
import { useAPIFlag } from '../../Context/APIContext';
import { searchLeaguesByName, getLeagueByName } from '../../Common/Services/LeagueService';
import '../../Styles/DashboardGood.css'; // Import the CSS file
import Navbar from '../NavBar/NavBar';

const DashboardGood = () => {
  const { useAPI } = useAPIFlag(); // UPDATE AS NEEDED IN APIContext.js
  const user = JSON.parse(localStorage.getItem('user'));
  const userID = user.objectId;
  const [portfolios, setPortfolios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [matchingLeagues, setMatchingLeagues] = useState([]);
  const [portfolioValues, setPortfolioValues] = useState({});
  const navigate = useNavigate();

  const handleSearchInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchMatchingLeagues(term);
  };

  const fetchMatchingLeagues = async (term) => {
    try {
      const matchingLeagues = await searchLeaguesByName(term);
      setMatchingLeagues(matchingLeagues);
    } catch (error) {
      console.error('Error fetching matching leagues', error);
    }
  };

  useEffect(() => {
    // Fetch user portfolios with their league names
    getAllUserPortfoliosWithLeagueNames(userID).then((portfolios) => {
      setPortfolios(portfolios);
    });
  }, [userID]);

  useEffect(() => {
    const fetchPortfolioValues = async () => {
      const values = {};
      for (const portfolio of portfolios) {
        const value = await getPortfolioCurrentValue(portfolio.id);
        values[portfolio.id] = value.toFixed(2);
      }
      setPortfolioValues(values);
    };

    if (portfolios.length > 0) {
      fetchPortfolioValues();
    }
  }, [portfolios]);

  useEffect(() => {
    if (portfolios.length > 0 && useAPI) {
      portfolios.forEach((portfolio) => {
        updatePortfolioPositions(portfolio.id);
        updatePortfolioCurrentValue(portfolio.id);
      });
    }
  }, [portfolios, useAPI]);

  const handleLeagueNameClick = async (leagueName) => {
    try {
      const league = await getLeagueByName(leagueName);
      if (league) {
        navigate(`/league/${league.id}`);
      } else {
        console.log('League not found');
      }
    } catch (error) {
      console.error('Error fetching league by name', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container backgroundStyle3">
        <section className="dashboard-left-side">
          <h1>Welcome {user.displayName} to your Dashboard!</h1>
          <br />
          <div className="accordion" id="portfolioAccordion">
            {portfolios.length > 0 &&
              portfolios.map((portfolio) => (
                <div className="accordion-item" key={portfolio.id}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${portfolio.id}`}
                      aria-expanded="false"
                      aria-controls={`collapse${portfolio.id}`}
                    >
                      {portfolio.PortfolioName}
                    </button>
                  </h2>
                  <div
                    id={`collapse${portfolio.id}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#portfolioAccordion"
                  >
                    <div className="accordion-body">
                      <p className="league-info">
                        <span> League: </span> 
                        <span className="league-link" onClick={() => handleLeagueNameClick(portfolio.leagueName)}> {portfolio.leagueName} </span>
                        <br />
                        <span>Current Value: ${portfolioValues[portfolio.id]}</span>
                        <br/>
                        <a className="league-link" href={`/Portfolio/${portfolio.PortfolioName}/${portfolio.id}`}>View Portfolio</a>
                        </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        <section className="dashboard-right-side">
          <h2>Find a League!</h2>
          <div className="dashboard-search-container">
            <input
              type="text"
              placeholder="Search for leagues..."
              value={searchTerm}
              onChange={handleSearchInputChange}
              className="search-bar"
            />
            {matchingLeagues.length > 0 && (
              <ul className="matching-leagues-list">
                {matchingLeagues.map((league) => (
                  <li key={league.id}>
                    <Link to={`/league/${league.id}`}>{league.get('LeagueName')}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link to="/create-league" className="dashboard-create-league-button">
            Create League
          </Link>
        </section>
      </div>
    </div>
  );
};

export default DashboardGood;

