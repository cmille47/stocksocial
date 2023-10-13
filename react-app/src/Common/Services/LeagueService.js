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