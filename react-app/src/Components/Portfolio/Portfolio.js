import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PortfolioPage from './PortfolioPage.js';
import { getPortfolio } from '../../Common/Services/PortolioService';
import { getPortfolioPositions } from '../../Common/Services/PositionService';



export default function Portfolio() {
    const { portfolio_id } = useParams();

    const [portfolio, setPortfolio] = useState(null);
    const [positions, setPositions] = useState([]);
    const [stockData, setStockData] = useState([]);

    // Fetch portfolio info and positions
    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                const portfolioData = await getPortfolio(portfolio_id);
                setPortfolio(portfolioData);
            } catch (error) {
                console.error('Error fetching portfolio:', error);
            }
        };

        const fetchPortfolioPositions = async () => {
            try {
                const positionsData = await getPortfolioPositions(portfolio_id);
                setPositions(positionsData);
            } catch (error) {
                console.error('Error fetching portfolio positions:', error);
            }
        };

        fetchPortfolioData();
        fetchPortfolioPositions();
    }, [portfolio_id]);

    return (
        <div>
            <h2>Portfolio ID: {portfolio_id} </h2>
            <PortfolioPage portfolio={portfolio} positions={positions} />
        </div>
    );
}