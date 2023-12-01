import Parse from 'parse';
import { getAllStocks } from './GetStockInfo';

export const getPosition = async (positionID) => {
    const Position = Parse.Object.extend('Position');
    const query = new Parse.Query(Position);
    query.equalTo('objectId', positionID);
    try {
        const result = await query.first();
        return result;
    } catch (error) {
        console.error('Error fetching position', error);
        throw error;
    }
};

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
