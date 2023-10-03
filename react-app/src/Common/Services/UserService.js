import Parse from "parse";

// Define the User class. Mr. GPT told me to make it a global
const User = Parse.Object.extend("User");

// Define the schema configuration to map attributes to database columns
User.schema = {
    class: "User", // database table name for users
    fields: {
        username: { type: "String", target: "username" },
        password: { type: "String", target: "password" },
        email: { type: "String", target: "email" },
        displayName: { type: "String", target: "displayName" },
        //lastname: { type: "String", target: "lastname_column" },
        // think we might need to have a function to get the next available userID from the databse . . . not sure
        
    },
};

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



// Function to create a new user in the database
export const createUser = async (user_info) => {
    const user = new User();

    // Set user attributes using the database column names
    user.set("username", user_info.username);
    user.set("password", user_info.password);
    user.set("email", user_info.email);
    user.set("displayName", user_info.displayName);        // I feel like we need to rename the fields so they are more intuitive
    // user.set("lastname", user_info.lastname);
    // need to set an userID????


    try {
        // Save the user to the database
        const result = await user.save();
        console.log("User created successfully:", result);
        return result;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};


// MITCHELL:
// take the form from the feature 3 and 
// use it to try to create a new user in the 
// database
// Function to handle form submission

// I did it in the parent component that way we know create user will always have the required informaiton and we don't have to 
// have two seperate functions, one with the form data and one with other data

