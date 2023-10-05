import React, { useState, useEffect } from "react";
import NewUser from "../NewUser/NewUser"; // Import the ParentComponent component
import UsersList from "./UsersList";
import {getAStock, getAllStocks} from "../../Common/Services/GetStockInfo.js";

const MainModule = () => {
    const [stockData, setstockData] = useState([]);

    useEffect(() => {
        getAllStocks().then((data) => {
            console.log(data);
        });
    }, []);

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
