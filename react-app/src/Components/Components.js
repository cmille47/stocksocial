import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MainModule from "./Main/Main.js"
import Dashboard from "./Dashboard/Dashboard.js"

const Components = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainModule />} />
                <Route path="/Dashboard/Dashboard.js" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default Components;
