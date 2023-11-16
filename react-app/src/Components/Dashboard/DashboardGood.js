import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAllUserPortfolios, updatePortfolioCurrentValue } from '../../Common/Services/PortolioService';
import { updatePortfolioPositions } from '../../Common/Services/PositionService';
import { useAPIFlag } from '../../APIContext';

const DashboardGood = () => {
    const {useAPI} = useAPIFlag(); // UPDATE AS NEEDED IN APIContext.js
    const user = JSON.parse(localStorage.getItem('user'));
    const userID = user.objectId;
    const [portfolios, setPortfolios] = useState([]);

    useEffect(() => {
        getAllUserPortfolios(userID).then((portfolios) => {
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
    }, [portfolios]);

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
            </section>
        </div>
    );
};

export default DashboardGood;
