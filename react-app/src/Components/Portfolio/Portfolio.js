import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortfolioPage from './PortfolioPage.js';
import { getPortfolio } from '../../Common/Services/PortfolioService';
import { getPortfolioPositions } from '../../Common/Services/PositionService';
import {searchForStock} from '../../Common/Services/StockService';
import SearchStocks from './SearchStocks.js';

export default function Portfolio() {
    const navigate = useNavigate();
    const { portfolio_id } = useParams();
    const user_id = JSON.parse(localStorage.getItem('user')).objectId;

    const [portfolio, setPortfolio] = useState(null);
    const [positions, setPositions] = useState([]);
    const [matchingStocks, setMatchingStocks] = useState([]);

    // Fetch portfolio info and positions
    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                const portfolioData = await getPortfolio(portfolio_id, user_id);
                setPortfolio(portfolioData);
                // Update the portfolio's current value
                const updatedValue = await updatePortfolioCurrentValue(portfolio_id);
                setCurrentValue(updatedValue);

            } catch (error) {
                console.error('Error fetching portfolio:', error);
            }
        };

        const fetchPortfolioPositions = async () => {
            try {
                const positions = await getPortfolioPositions(portfolio_id);
                setPositions(positions);
            } catch (error) {
                console.error('Error fetching portfolio positions:', error);
            }
        };
        fetchPortfolioData();
        fetchPortfolioPositions();
    }, [portfolio_id, navigate, user_id]);

    const onClick = (e) => {
        e.preventDefault();
        const ticker = e.target.dataset.ticker;
        const position_id = e.target.dataset.position;
        if (position_id){
            const position = positions.find((position) => position.id === position_id);
            localStorage.setItem('position', JSON.stringify(position));
        };
        localStorage.setItem('portfolio', portfolio); 
        navigate(`/position/${ticker}`);
    };

    const handleSearchInputChange = async (e) => {
        const term = e.target.value;
        try{
            const res = await searchForStock(term);
            setMatchingStocks(res);
        }
        catch (error){
            console.error("Error searching for matching stocks:", error)
        }
    };

    return (
        <div>
            <h2>Portfolio ID: {portfolio_id} </h2>
            <PortfolioPage 
                portfolio={portfolio}
                positions={positions}
                onClick={onClick}
            />
            <SearchStocks
                handleSearchTermChange={handleSearchInputChange}
                matchingStocks={matchingStocks}
                onClick={onClick}
            />
        </div>
    );
}