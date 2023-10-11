import Parse from 'parse';

export const getPortolioPositions = async (portfolioID) => {
    const Position = Parse.Object.extend('Position');
    const query = new Parse.Query(Position);
    query.equalTo('PortfolioID', portfolioID);
    const results = await query.find();
    return results;
};
