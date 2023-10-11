import Parse from "parse";

export const getUserFriends = async (userID) => {
    const Friend = Parse.Object.extend("Friend");
    const query = new Parse.Query(Friend);
    query.equalTo("userID", userID);
    try {
        const results = await query.find();
        return results;
    } catch (error) {
        console.error("Error fetching user friends", error);
        throw error;
    }
};

export const createFriend = async (userID, friendID) => {
    const Friend = Parse.Object.extend("Friend");
    const friend = new Friend();
    friend.set("userID", userID);
    friend.set("friendID", friendID);
    try {
        const result = await friend.save();
        return result;
    } catch (error) {
        console.error("Error creating friend", error);
        throw error;
    }
};

export const getAllFriends = async () => {
    const Friend = Parse.Object.extend("Friend");
    const query = new Parse.Query(Friend);
    return query.find().then((result) => {
        return result;
    });
};
