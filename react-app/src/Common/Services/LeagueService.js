import Parse from "parse";

<<<<<<< HEAD
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
    league.set('NumPlayers', leagueInfo.numPlayers);
    league.set('StartingAmount', leagueInfo.startingAmount);

    try {
        const result = await league.save();
        return result;
    } catch (error) {
        console.error("Error creating league", error);
=======
// Define the User class. Mr. GPT told me to make it a global
const League = Parse.Object.extend("League");

// Define the schema configuration to map attributes to database columns
League.schema = {
    class: "League", // database table name for users
    fields: {
        username: { type: "String", target: "username" },
        password: { type: "String", target: "password" },
        email: { type: "String", target: "email" },
        displayName: { type: "String", target: "displayName" },
        //lastname: { type: "String", target: "lastname_column" },
        // think we might need to have a function to get the next available userID from the databse . . . not sure
        
    },
};

export const getAllUsersInLeague = async () => {
    /* const User = Parse.Object.extend("User");
    const query = new Parse.Query(User);
    return query.find().then((result) => {
        return result;
    });
    */
};




// Function to create a new user in the database
export const createLeague = async (league_info) => {
    const user = new League();

    // Set League attributes using the database column names
    League.set("LeagueName", League_info.LeagueName);
    League.set("NumPlayers", League_info.NumPlayers);
    League.set("StartingAmount", League_info.StartingAmount);


    try {
        // Save the user to the database
        const result = await League.save();
        console.log("League created successfully:", result);
        return result;
    } catch (error) {
        console.error("Error creating League:", error);
>>>>>>> main
        throw error;
    }
};

<<<<<<< HEAD
=======

// MITCHELL:
// take the form from the feature 3 and 
// use it to try to create a new user in the 
// database
// Function to handle form submission

// I did it in the parent component that way we know create user will always have the required informaiton and we don't have to 
// have two seperate functions, one with the form data and one with other data

>>>>>>> main
