import Parse from 'parse';

export const updatePortfolioCurrentValue = async (portfolioID) => {
    const Position = Parse.Object.extend('Position');
    const query = new Parse.Query(Position);
    query.equalTo('PortfolioID', portfolioID);
    const results = await query.find();

    let curr_val = 0;
    results.forEach((position) => {
        curr_val += position.get('EndPrice') * position.get('Shares');
    });

    const Portfolio = Parse.Object.extend('Portfolio');
    const query2 = new Parse.Query(Portfolio);
    try {
        const portfolio = await query2.get(portfolioID);
        curr_val += portfolio.get('RemainingCash');
        portfolio.set('currentValue', curr_val);
        await portfolio.save();
        return curr_val;
    } catch (error) {
        console.error('Error updating portfolio current value', error);
        throw error;
    }
};

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

export const getPortfolio = async (portfolioID, userID) => {
    const Portfolio = Parse.Object.extend('Portfolio');
    const query = new Parse.Query(Portfolio);
    query.equalTo('objectId', portfolioID);
    query.equalTo('UserID', userID);
    try {
        const result = await query.first();
        if (result === undefined) {throw new Error('User portfolio does not exist');}
        return result;
    } catch (error) {
        console.error('Error fetching portfolio', error);
        throw error;
    }
}

