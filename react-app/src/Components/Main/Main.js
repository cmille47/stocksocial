import React from "react";
import NewUser from "../NewUser/NewUser"; // Import the ParentComponent component
import UsersList from "./UsersList";

const MainModule = () => {
    return (
        <div>
            <div>
                <h1>Welcome to the Main Component</h1>
                <NewUser />
            </div>
            <div style={{marginTop: '10px'}}>
                Current UsersList:
                <UsersList />
            </div>
        </div>
    );
};

export default MainModule;
