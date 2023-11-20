import Parse from 'parse';
import { getAllStocks } from './GetStockInfo';

export const getPortfolioPositions = async (portfolioID) => {
    const Position = Parse.Object.extend('Position');
    const query = new Parse.Query(Position);
    query.equalTo('PortfolioID', portfolioID);
    const results = await query.find();
    return results;
};

export const updatePortfolioPositions = async (portfolioID) => {
    const Position = Parse.Object.extend('Position');
    const query = new Parse.Query(Position);
    query.equalTo('PortfolioID', portfolioID);
    const results = await query.find();

    const stockData = await getAllStocks();

    results.forEach((position) => {
        const stock = stockData.find((stock) => stock.symbol === position.get('stockTicker'));
        if (stock) {
            position.set('EndPrice', stock.price);
            position.save();
        } else {
            console.error(`Error: No stock found for ${position.get('stockTicker')}`);
        }
    });
};
