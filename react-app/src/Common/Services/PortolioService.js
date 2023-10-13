import Parse from 'parse';

export const getAllUserPortfolios = async (userID) => {
    const Portfolio = Parse.Object.extend('Portfolio');
    const query = new Parse.Query(Portfolio);
    query.equalTo('UserID', userID);
    try {
        const results = await query.find();
        return results;
    } catch (error) {
        console.error('Error fetching user portfolios', error);
        throw error;
    }
};

// gets users portolio for a specific league
export const getUserLeaguePortfolio = async (userID, leagueID) => {
    const Portfolio = Parse.Object.extend('Portfolio');
    const query = new Parse.Query(Portfolio);
    query.equalTo('UserID', userID);
    query.equalTo('LeagueID', leagueID);
    try {
        const result = await query.first();
        return result;
    } catch (error) {
        console.error('Error fetching user portfolio', error);
        throw error;
    }
};

export const getLeaguePortfolios = async (leagueID) => {
    const Portfolio = Parse.Object.extend('Portfolio');
    const query = new Parse.Query(Portfolio);
    query.equalTo('LeagueID', leagueID);
    try {
        const results = await query.find();
        return results;
    } catch (error) {
        console.error('Error fetching league portfolios', error);
        throw error;
    }
};

// idk if this one will ever be used
export const getPortfolio = async (portfolioID) => {
    const Portfolio = Parse.Object.extend('Portfolio');
    const query = new Parse.Query(Portfolio);
    query.equalTo('objectId', portfolioID);
    try {
        const result = await query.first();
        return result;
    } catch (error) {
        console.error('Error fetching portfolio', error);
        throw error;
    }
}

