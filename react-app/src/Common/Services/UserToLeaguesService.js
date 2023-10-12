import Parse from "parse";

// get all league members in a league
export const getLeagueMembers = async (leagueID) => {
    const Member = Parse.Object.extend("UsersToLeagues");
    const query = new Parse.Query(Member);
    query.equalTo("LeagueID", leagueID);
    try {
        const results = await query.find();
        return results;
    } catch (error) {
        console.error("Error fetching league members", error);
        throw error;
    }
};

// get all leagues a user is in 
export const getUserLeagues = async (userID) => {
    const League = Parse.Object.extend("UsersToLeagues");
    const query = new Parse.Query(League);
    query.equalTo("UserID", userID);
    try {
        const results = await query.find();
        return results;
    } catch (error) {
        console.error("Error fetching user leagues", error);
        throw error;
    }
};

// create a user to league relationship
export const addUserToLeague = async (userID, leagueID) => {
    const League = Parse.Object.extend("UsersToLeagues");
    const league = new League();
    league.set("UserID", userID);
    league.set("LeagueID", leagueID);
    try {
        const result = await league.save();
        return result;
    } catch (error) {
        console.error("Error creating league", error);
        throw error;
    }
}