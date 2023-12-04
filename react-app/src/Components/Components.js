import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AuthLogin from "./Auth/AuthLogin.js";
import Dashboard from "./Dashboard/DashboardHome.js";
import AboutUs from "./AboutUs.js";
import Portfolio from "./Portfolio/Portfolio.js";
import League from "./League/League.js";
import AuthRegister from "./Auth/AuthRegister.js";
import ProtectedRoute from "../Common/Services/ProtectedRoute.js";
import LeagueDetails from "./League/LeagueDetails.js";
import Position from "./Position/Position.js";
import Navbar from './NavBar/NavBar.js'; // Moved Navbar here

const Components = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<AuthLogin />} />
                <Route path="/signup" element={<AuthRegister />} />
                <Route path="/Portfolio/:portfolio_name/:portfolio_id" element={<ProtectedRoute element={Portfolio} />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/AboutUs" element={<ProtectedRoute element={AboutUs} />} /> 
                <Route path="/create-league" element={<ProtectedRoute element={League} />} />
                <Route path="*" element = {<h1>404 Not Found</h1>} />
                <Route path="/league/:leagueId" element={<LeagueDetails />} />
                <Route path="/position/:stockSymbol" element={<ProtectedRoute element={Position} />} />
            </Routes>
        </Router>
    );
};

export default Components;


