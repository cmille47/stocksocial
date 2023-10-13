import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MainModule from "./Main/Main.js"
import Dashboard from "./Dashboard/Dashboard.js"
import League from "./League/League.js"
import NewUser from "./NewUser/NewUser.js"

const Components = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainModule />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/create-league" element={<League/>} />
                <Route path="/NewUser" element={<NewUser/>} />
            </Routes>
        </Router>
    );
};

export default Components;
