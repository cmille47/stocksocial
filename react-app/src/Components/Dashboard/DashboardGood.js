import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAllUserPortfolios } from '../../Common/Services/PortolioService';

// will need to add all the other stuff here too
// like user leagues, etc. 
const DashboardGood = () => {
    const { userID } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const [portfolios, setPortfolios] = useState([]);

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
                <h1>Welcome to the Dashboard component: {userID}</h1>
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
