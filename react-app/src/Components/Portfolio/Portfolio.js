import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PortfolioPage from './PortfolioPage.js';
import { getPortfolio } from '../../Common/Services/PortfolioService';
import { getPortfolioPositions } from '../../Common/Services/PositionService';
import { searchForStock } from '../../Common/Services/StockService';
import SearchStocks from './SearchStocks.js';
import Navbar from '../NavBar/NavBar.js';

export default function Portfolio() {
    const navigate = useNavigate();
    const { portfolio_id } = useParams();
    const user_id = JSON.parse(localStorage.getItem('user')).objectId;
    const [portfolio, setPortfolio] = useState(null);
    const [positions, setPositions] = useState([]);
    const [activePositions, setActivePositions] = useState([]);
    const [inactivePositions, setInactivePositions] = useState([]);
    const [matchingStocks, setMatchingStocks] = useState([]);
    const [ownership, setOwnership] = useState(false);

    // make sure these are reset 
    localStorage.removeItem('position');
    localStorage.removeItem('portfolio');

    // Fetch portfolio info and positions
    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                const portfolioData = await getPortfolio(portfolio_id);
                if (!portfolioData) {
                    alert('Error fetching portfoio');
                    navigate('/Dashboard');
                    return;
                }
                setPortfolio(portfolioData);
            } catch (error) {
                console.error('Error fetching portfolio:', error);
            }
        };

        const fetchPortfolioPositions = async () => {
            try {
                const positions = await getPortfolioPositions(portfolio_id);
                setActivePositions(positions.filter((position) => position.get('DateSold') === undefined));
                setInactivePositions(positions.filter((position) => position.get('DateSold') !== undefined));
                setPositions(positions);
            } catch (error) {
                console.error('Error fetching portfolio positions:', error);
            }
        };

        fetchPortfolioData();
        fetchPortfolioPositions();
    }, [portfolio_id, navigate, user_id]);

    useEffect(() => {
        if (portfolio && portfolio.get('UserID') === user_id) {
            setOwnership(true);
        }
    }, [portfolio, user_id]);

    const onClick = (e) => {
        e.preventDefault();
        if (ownership) { // can only go to position page if it is yours
            const ticker = e.target.dataset.ticker;
            const position_id = e.target.dataset.position;
            if (position_id) {
                const position = positions.find((position) => position.id === position_id);
                localStorage.setItem('position', JSON.stringify(position));
            };
            localStorage.setItem('portfolio', JSON.stringify(portfolio));
            navigate(`/position/${ticker}`);
        }
    };

    const handleSearchInputChange = async (e) => {
        const term = e.target.value;
        try {
            const res = await searchForStock(term);
            setMatchingStocks(res);
        }
        catch (error) {
            console.error("Error searching for matching stocks:", error)
        }
    };

    return (
        <div>
            <Navbar />
            <PortfolioPage
                portfolio={portfolio}
                activePositions={activePositions}
                inactivePositions={inactivePositions}
                onClick={onClick}
            />
            {ownership && (
                <SearchStocks
                    handleSearchTermChange={handleSearchInputChange}
                    matchingStocks={matchingStocks}
                    onClick={onClick}
                />
            )}
        </div>
    );
}