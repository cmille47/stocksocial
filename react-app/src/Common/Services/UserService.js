import Parse from "parse";

export const getAllUsers = async () => {
    const User = Parse.Object.extend("User");
    const query = new Parse.Query(User);
    return query.find().then((result) => {
        return result;
    });
};

// MITCHELL: 
// pass in a user_info object that contains
// username, password, firstname, lastname, email
// and create a new user in database
export const createUser = async (user_info) => {
    const User = Parse.Object.extend("User");
    const user = new User();
};

// MITCHELL:
// take the form from the feature 3 and 
// use it to try to create a new user in the 
// database