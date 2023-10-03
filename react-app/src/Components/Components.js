import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MainModule from "./Main/Main.js"

const Components = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainModule />} />
            </Routes>
        </Router>
    );
};

export default Components;
