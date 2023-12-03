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

// update multiple attributes at once
// each update is a tuple of (key, value)
export const updatePosition = async (position_id, updates) => {
    const Position = Parse.Object.extend('Position');
    const query = new Parse.Query(Position);
    query.equalTo('objectId', position_id);
    const position = await query.first();
    try{
        updates.forEach((update) => {
            const {key, value} = update;
            position.set(key, value);
        });
        return await position.save();
    }
    catch (error){
        console.error('Error updating portfolio', error);
        throw error;
    }
};

export const createPosition = async (portfolioID, stockName, stockTicker, shares, startPrice, endPrice) => {
    const Position = Parse.Object.extend('Position');
    const position = new Position();
    position.set('PortfolioID', portfolioID);
    position.set('stockName', stockName);
    position.set('stockTicker', stockTicker);
    position.set('Shares', Number(shares));
    position.set('StartPrice', startPrice);
    position.set('EndPrice', endPrice);
    return await position.save();
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
