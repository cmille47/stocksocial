import Parse from 'parse';

export const getPortfolioPositions = async (portfolioID) => {
    const Position = Parse.Object.extend('Position');
    const query = new Parse.Query(Position);
    query.equalTo('PortfolioID', portfolioID);
    const results = await query.find();
    return results;
};

// due to API constaints, this will fake
// a stocks price for each position a user has
// this usage would mirror unlimited API calls if we had them
export const updateStockPrice = async (positionID) => {
    const PositionObject = Parse.Object.extend('Position');
    const query = new Parse.Query(PositionObject);

    try {
        const Position = await query.get(positionID);

        // get random 'new price'
        const past_price = Position.get('EndPrice'); 
        const new_price = past_price + (Math.random() - 0.5) * past_price;

        Position.set('EndPrice', new_price);
        await Position.save();
        console.log('New Position Price Set', Position);

        return Position;
    } catch (error) {
        console.error('Error while setting new position price', error);
        throw error;
    }
}