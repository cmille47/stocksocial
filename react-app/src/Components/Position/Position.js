import {useState, useEffect } from 'react';
import { useAPIFlag } from '../../Context/APIContext';
import {useNavigate, useParams} from 'react-router-dom';
import {getPosition} from '../../Common/Services/PositionService';
import { getAStock, getDailyChartData } from '../../Common/Services/GetStockInfo';

const Position = () => {
    const navigate = useNavigate();
    const {useAPI} = useAPIFlag();
    const position = JSON.parse(localStorage.getItem('position'));
    const user = JSON.parse(localStorage.getItem('user'));
    const portfolio = JSON.parse(localStorage.getItem('portfolio'));
    const userID = user.objectId;
    const stockTicker = useParams();
    const [stockData, setStockData] = useState(null);
    const [stockChart, setStockChart] = useState(null);

    useEffect(() => {
        if (!portfolio){
            navigate('/dashboard'); // go to dashboard if no portfolio (hard coded in)
        }
    }, [navigate, portfolio]);

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const stockData = await getAStock(stockTicker);
                const stockChart = await getDailyChartData(stockTicker);
                setStockData(stockData);
                setStockChart(stockChart);
            } catch (error) {
                console.error('Error fetching stock:', error);
            }
        };
        if (useAPI){
            fetchStockData();
        }
    }, [stockTicker, useAPI]);


    // NEED TO CLEAN UP DATA SO WE KNOW EXACTLY! WHAT WE ARE SENDING
    // TO STOCK INFO.
    // one should be stock data, one child for chart

    return (
        <div>

        </div>
    );
}

export default Position;