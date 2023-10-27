import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AuthLogin from "./Auth/AuthLogin.js";
import Dashboard from "./Dashboard/DashboardHome.js";
import Portfolio from "./Portfolio/Portfolio.js";
import League from "./League/League.js";
import AuthRegister from "./Auth/AuthRegister.js";
import ProtectedRoute from "../Common/Services/ProtectedRoute.js";

const Components = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthLogin />} />
                <Route path="/signup" element={<AuthRegister />} />
                <Route path="/Portfolio/:portfolio_name/:portfolio_id" element={<ProtectedRoute element={Portfolio} />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/create-league" element={<League/>} />
                <Route path="*" element = {<h1>404 Not Found</h1>} />
            </Routes>
        </Router>
    );
};

export default Components;
