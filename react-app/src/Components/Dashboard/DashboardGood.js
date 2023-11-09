import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAllUserPortfolios } from '../../Common/Services/PortolioService';
import { searchLeaguesByName } from '../../Common/Services/LeagueService';
import '../../Styles/DashboardGood.css';

// will need to add all the other stuff here too
// like user leagues, etc. 
const DashboardGood = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userID = user.objectId;
    const [portfolios, setPortfolios] = useState([]);

    //*********** 

    // DashboardGood.js
    const [searchTerm, setSearchTerm] = useState('');
    const [matchingLeagues, setMatchingLeagues] = useState([]);


    // DashboardGood.js
    const handleSearchInputChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        fetchMatchingLeagues(term); // Assuming you have a function for fetching matching leagues
    };
  
    // DashboardGood.js
    const fetchMatchingLeagues = async (term) => {
        try {
            const matchingLeagues = await searchLeaguesByName(term);
            setMatchingLeagues(matchingLeagues);
        } 
        catch (error) {
            console.error('Error fetching matching leagues', error);
        }
    };

    // ***************
    useEffect(() => {
        getAllUserPortfolios(userID).then((portfolios) => {
            setPortfolios(portfolios);
        });
    }, [userID]);

    useEffect(() => {
        console.log("portfolios: ", portfolios);
        console.log("user: ", user);
    }, [portfolios, user]);

    return (
        <div>
            <section>
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
                                <a href={`/Portfolio/${encodeURIComponent(portfolio.get("PortfolioName"))}/${portfolio.id}`}>
                                    {portfolio.get("PortfolioName")}
                                </a>
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
