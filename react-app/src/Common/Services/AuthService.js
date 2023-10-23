import Parse from 'parse';

export const createUser = async (user_info) => {
    const user = new Parse.User();

    user.set("username", user_info.username);
    user.set("password", user_info.password);
    user.set("email", user_info.email);
    user.set("displayName", user_info.firstname + " " + user_info.lastname);

    return user.signUp();
};

// utilize parse user function for login
// NOTE: DID NOT CATCH ERROR/RETURN RESPONSE. ERROR WILL BE PASSED ALONG TO AUTHLOGIN.JS
// WHERE IT CAN MORE APPROPRIATELY BE HANDLED
export const loginUser = async (user_info) => {
    return Parse.User.logIn(user_info.email, user_info.password);
};

export const logoutUser = async () => {
    return Parse.User.logOut().then(() => {
        return true;
    })
    .catch((error) => {
        return error;
    });
};

