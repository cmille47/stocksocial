import Parse from "parse";
import { createNewPortfolio } from "./PortfolioService";


export const getLeague = async (leagueID) => {
    const League = Parse.Object.extend("League");
    const query = new Parse.Query(League);
    query.equalTo("objectId", leagueID);
    try {
        const result = await query.first();
        return result;
    } catch (error) {
        console.error("Error fetching league", error);
        throw error;
    }
};

/*
export const createLeague = async (leagueInfo, userId) => {
    const League = Parse.Object.extend('League');
    const league = new League();
  
    league.set('LeagueName', leagueInfo.leagueName); 
    league.set('StartingAmount', parseInt(leagueInfo.startingAmount));
    league.set('NumPlayers', parseInt(leagueInfo.numPlayers));
    league.set('CreatorID', userId); // Utilize the userId passed as a parameter
  
    try {
      const result = await league.save();
  
      // If league creation is successful, automatically add the user to the league
      if (result && result.id) {
        await addUserToLeague(userId, result.id);
        console.log('User added to the league upon creation');
      } else {
        console.error('League creation failed');
      }
  
      return result;
    } catch (error) {
        console.error('Error creating league', error);
        throw error;
    }  
    
  };
*/

export const createLeague = async (leagueInfo, userId) => {
    const League = Parse.Object.extend('League');
    const league = new League();

    league.set('LeagueName', leagueInfo.leagueName);
    league.set('StartingAmount', parseInt(leagueInfo.startingAmount));
    league.set('NumPlayers', parseInt(leagueInfo.numPlayers));
    league.set('CreatorID', userId);

    try {
        const result = await league.save();

        if (result && result.id) {
            await createNewPortfolio(userId, result.id, leagueInfo.leagueName);
            console.log('User added to the league upon creation');
        } else {
            console.error('League creation failed');
        }

        return result;
    } catch (error) {
        console.error('Error creating league', error);
        throw error;
    }
};
  


export const getUserIdFromStorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.objectId : null;
  };
  

// leagueService.js
export const searchLeaguesByName = async (term) => {
    console.log('searchLeaguesByName function called with term:', term);
    const League = Parse.Object.extend("League");
    const query = new Parse.Query(League);
    query.startsWith("LeagueName", term);
    try {
      const results = await query.find();
      return results;
    } catch (error) {
      console.error("Error searching leagues by name", error);
      throw error;
    }
  };

export const addUserToLeague = async (userId, leagueId) => {
    // Check if the user is already in the league
    const LeagueMembership = Parse.Object.extend('LeagueMembership');
    const membershipQuery = new Parse.Query(LeagueMembership);
    membershipQuery.equalTo('userId', userId);
    membershipQuery.equalTo('leagueId', leagueId);

    try {
    const existingMembership = await membershipQuery.first();

    if (existingMembership) {
    // User is already in the league
    console.log('User is already in the league');
    return;
    }

    // If not, add the user to the league
    const newMembership = new LeagueMembership();
    newMembership.set('userId', userId);
    newMembership.set('leagueId', leagueId);

    await newMembership.save();

    console.log('User added to the league successfully');
    } catch (error) {
    console.error('Error adding user to the league', error);
    throw error;
    }
    };

export const checkUserInLeague = async (userId, leagueId) => {
    const LeagueMembership = Parse.Object.extend('UsersToLeagues');
    const query = new Parse.Query(LeagueMembership);
    query.equalTo('userId', userId);
    query.equalTo('leagueId', leagueId);
    try {
    const result = await query.first();
    return result;
    } catch (error) {
    console.error('Error checking user in league', error);
    throw error;
    }
};

  // Function to update the current number of players in the league
export const updateCurrentPlayers = async (leagueId, currentPlayers) => {
    const League = Parse.Object.extend('League');
    const query = new Parse.Query(League);
    try {
      const league = await query.get(leagueId);
      league.set('CurrentPlayers', currentPlayers);
      await league.save();
    } catch (error) {
      console.error('Error updating current players in the league', error);
      throw error;
    }
  };

  export const getLeagueByName = async (leagueName) => {
    const League = Parse.Object.extend('League');
    const query = new Parse.Query(League);
    query.equalTo('LeagueName', leagueName);
    try {
      const league = await query.first();
      return league;
    } catch (error) {
      console.error('Error fetching league by name', error);
      throw error;
    }
  };
  










 

  
  
  

  