import Parse from 'parse';
import { getLeague } from './LeagueService';

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

export const getAllUserPortfoliosWithLeagueNames = async (userID) => {
    try {
        const userPortfolios = await getAllUserPortfolios(userID);
        const portfoliosWithLeagueNames = await Promise.all(userPortfolios.map(async (portfolio) => {
            const leagueID = portfolio.get('LeagueID');
            const league = await getLeague(leagueID);
            const leagueName = league.get('LeagueName');
            // Replace 'get' with direct property access based on your Parse object structure
            return { id: portfolio.id, PortfolioName: portfolio.get('PortfolioName'), leagueName };
        }));
        return portfoliosWithLeagueNames;
    } catch (error) {
        console.error('Error fetching user portfolios with league names', error);
        throw error;
    }
};




export const createNewPortfolio = async (userId, leagueId, portfolioName) => {
    const Portfolio = Parse.Object.extend("Portfolio");
    const portfolio = new Portfolio();

    portfolio.set("UserID", userId);
    portfolio.set("LeagueID", leagueId);
    portfolio.set("PortfolioName", portfolioName); // Use the provided portfolio name

    try {
        const newPortfolio = await portfolio.save();
        console.log("New portfolio created for the user in the league:", newPortfolio);
        return newPortfolio;
    } catch (error) {
        console.error("Error creating new portfolio", error);
        throw error;
    }
};



/*
export const fetchUserPortfoliosAndLeagues = async (userID) => {
    try {
        // Fetch user portfolios
        const userPortfolios = await getAllUserPortfolios(userID);
        console.log('User Portfolios:', userPortfolios);
        
        // Extract league IDs from portfolios
        const leagueIds = userPortfolios.map(portfolio => portfolio.get('LeagueID'));
        console.log('League IDs:', leagueIds);
        
        // Fetch leagues for these IDs
        const userLeagues = await Promise.all(leagueIds.map(leagueID => getLeague(leagueID)));
        console.log('Leagues:', userLeagues);

        return { userPortfolios, userLeagues };
    } catch (error) {
        console.error('Error fetching user portfolios and leagues', error);
        throw error;
    }
};

// PortfolioService.js

export const fetchLeaguesByIDs = async (leagueIds) => {
    const League = Parse.Object.extend('League');
    const query = new Parse.Query(League);
    query.containedIn('LeagueID', leagueIds); // Assuming LeagueID is the column name for IDs

    try {
        const results = await query.find();
        // Map results to objects with necessary details
        const leagues = results.map(league => ({
            id: league.id,
            name: league.get('LeagueName'), // Adjust based on your database schema
            // Include other necessary league details here
        }));
        return leagues;
    } catch (error) {
        console.error('Error fetching leagues by IDs', error);
        throw error;
    }
};

*/

  

