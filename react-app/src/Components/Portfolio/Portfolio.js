import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortfolioPage from './PortfolioPage.js';
import { getPortfolio } from '../../Common/Services/PortolioService';
import { getPortfolioPositions, updateStockPrice } from '../../Common/Services/PositionService';
import {searchForStock} from '../../Common/Services/StockService';
import SearchStocks from './SearchStocks.js';

export default function Portfolio() {
    const navigate = useNavigate();
    const { portfolio_id } = useParams();
    const user_id = JSON.parse(localStorage.getItem('user')).objectId;

    const [portfolio, setPortfolio] = useState(null);
    const [positions, setPositions] = useState([]);
    const [currentValue, setCurrentValue] = useState(0);
    const [matchingStocks, setMatchingStocks] = useState([]);

    // Fetch portfolio info and positions
    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                const portfolioData = await getPortfolio(portfolio_id, user_id);
                setPortfolio(portfolioData);
            } catch (error) {
                console.error('Error fetching portfolio:', error);
                alert("Invalid Page Requested");
                navigate(-1);
            }
        };

        const fetchPortfolioPositions = async () => {
            try {
                const positions = await getPortfolioPositions(portfolio_id);
                const priceUpdatedPositions = await Promise.all(positions.map(async (position) => {
                    return await updateStockPrice(position.id);
                }));
                setPositions(priceUpdatedPositions);
            } catch (error) {
                console.error('Error fetching portfolio positions:', error);
            }
        };
        fetchPortfolioData();
        fetchPortfolioPositions();
    }, [portfolio_id]);

    useEffect(() => {
        if (positions.length > 0){
            console.log('Updated Positions:', positions);

            // calculate total portfolio value from all current positions
            let temp = portfolio.get('RemainingCash');
            positions.forEach((position) => {
                temp += position.get('EndPrice') * position.get('Shares');
            });
            setCurrentValue(Math.round(temp * 100) / 100);
        }   
    }, [positions]);

    const onClick = (e) => {
        e.preventDefault();
        console.log(e.target);
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
                val={currentValue} 
            />
            <SearchStocks
                handleSearchTermChange={handleSearchInputChange}
                matchingStocks={matchingStocks}
            />
        </div>
    );
}