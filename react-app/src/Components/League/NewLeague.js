import React, { useState } from "react";
import { createLeague } from "../../Common/Services/LeagueService";
import { createNewPortfolio } from "../../Common/Services/PortfolioService";
import NewLeagueForm from "./NewLeagueForm";
import { useNavigate } from "react-router-dom";

const NewLeague = () => {
    const history = useNavigate();
    
    const user = JSON.parse(localStorage.getItem('user'));
    const currentUser = user.objectId;

    const [formData, setFormData] = useState({
        leagueName: "",
        portfolioName: "" // Include portfolio name in the form data
    });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const { leagueName, startingAmount, numPlayers, portfolioName } = formData; // Destructure the form data
            const result = await createLeague({ leagueName, startingAmount, numPlayers }, currentUser);
    
            if (result && result.id) {
                await createNewPortfolio(currentUser, result.id, portfolioName); // Create a new portfolio associated with the created league
                console.log("League and Portfolio created successfully");
                history("/Dashboard");
            } else {
                console.error("League creation failed");
            }
        } catch (error) {
            console.error("Error creating League:", error);
        }
    };
    
      

    return (
        <div>
            <NewLeagueForm
                formData={formData}
                handleInput={handleInput}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default NewLeague;