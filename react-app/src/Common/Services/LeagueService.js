import Parse from "parse";


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



export const createLeague = async (leagueInfo) => {
    const League = Parse.Object.extend("League");
    const league = new League();



    league.set('LeagueName', leagueInfo.leagueName); 
    league.set('StartingAmount', parseInt(leagueInfo.startingAmount));
    league.set('NumPlayers', parseInt(leagueInfo.numPlayers));

    try {
        const result = await league.save();
        return result;
    } catch (error) {
        console.error("Error creating league", error);
    }
};

// leagueService.js
export const searchLeaguesByName = async (term) => {
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
  

  