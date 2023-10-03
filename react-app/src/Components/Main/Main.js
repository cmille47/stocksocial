import React from "react";
import ParentComponent from "../NewUser/NewUser"; // Import the ParentComponent component

const MainModule = () => {
    return (
        <div>
            <h1>Welcome to the Main Component</h1>
            <ParentComponent />
        </div>
    );
};

export default MainModule;
