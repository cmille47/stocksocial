import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updatePortfolioCurrentValue, getAllUserPortfoliosWithLeagueNames } from '../../Common/Services/PortfolioService';
import { updatePortfolioPositions } from '../../Common/Services/PositionService';
import { useAPIFlag } from '../../APIContext';
import { searchLeaguesByName, getLeagueByName } from '../../Common/Services/LeagueService';
import '../../Styles/DashboardGood.css';
import LogoutButton from '../Logout/LogoutButton'; 


const DashboardGood = () => {
    const {useAPI} = useAPIFlag(); // UPDATE AS NEEDED IN APIContext.js
    const user = JSON.parse(localStorage.getItem('user'));
    const userID = user.objectId;
    const [portfolios, setPortfolios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [matchingLeagues, setMatchingLeagues] = useState([]);
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
        if ((portfolios.length > 0) && (useAPI)) {
            portfolios.forEach((portfolio) => {
                updatePortfolioPositions(portfolio.id)
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
            <section>
                <LogoutButton /> {/* Include the LogoutButton component here */}
                <h1>Welcome to the Dashboard component: {user.displayName}</h1>
                
                <Link to="/create-league">
                    <button>Create League</button>
                </Link>
                <br />
                Portfolios:
                {portfolios.length > 0 && (
                    <ul>
                        {portfolios.map((portfolio) => (
                            <li key={portfolio.id}>
                                <Link to={`/Portfolio/${encodeURIComponent(portfolio.PortfolioName)}/${portfolio.id}`}>
                                    {portfolio.PortfolioName}
                                </Link>
                                - 
                                <span
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleLeagueNameClick(portfolio.leagueName)}
                                >
                                    {portfolio.leagueName}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
                
                <div className="search-container">
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
                                    <Link to={`/league/${league.id}`}>
                                        {league.get('LeagueName')}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
        </div>
    );
};

export default DashboardGood;
