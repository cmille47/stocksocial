import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAllUserPortfolios } from '../../Common/Services/PortolioService';

// will need to add all the other stuff here too
// like user leagues, etc. 
const DashboardGood = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userID = user.objectId;
    const [portfolios, setPortfolios] = useState([]);
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        getAllUserPortfolios(userID).then((portfolios) => {
            setPortfolios(portfolios);
        });
    }, [userID]);

    useEffect(() => {
        const updatePortfolios = async () => {
            try {
                // Assuming portfolios is an array of portfolio objects
                const promises = portfolios.map(async (portfolio) => {
                    const positions = await getPortfolioPositions(portfolio.id);
                    const priceUpdatedPositions = await Promise.all(positions.map(async (position) => {
                        return await updateStockPrice(position.id);
                    }));
                    return { ...portfolio, positions: priceUpdatedPositions };
                });
        
                const updatedPortfolios = await Promise.all(promises);
                console.log('Updated Portfolios:', updatedPortfolios);
                // Handle the updated portfolios as needed, for example, set state
            } catch (error) {
                console.error('Error updating portfolios:', error);
            }
        };
        updatePortfolios();
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
            </section>
        </div>
    );
};

export default DashboardGood;
