import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MainModule from "./Main/Main.js"
import Dashboard from "./Dashboard/Dashboard.js"
import Portfolio from "./Portfolio/Portfolio.js"

const Components = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainModule />} />
                <Route path="/Dashboard/Dashboard.js" element={<Dashboard />} />
                <Route path="/Portfolio/:portfolio_name/:portfolio_id" element={<Portfolio />} />
            </Routes>
        </Router>
    );
};

export default Components;
