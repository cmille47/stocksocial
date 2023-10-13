import React, { useState, useEffect } from "react";
import { createLeague } from "../../Common/Services/LeagueService"; // Import the createLeague function
import NewLeagueForm from "./NewLeagueForm";
import { useNavigate } from "react-router-dom";


// Define the parent component
// creating a default formData in parent component
const NewLeague = () => {
    const history = useNavigate();
    // Define state to store form input values
    const [formData, setFormData] = useState({
        leagueName: "",
        startingAmount: 0,
        numPlayers: 0,
    });

    // Handle input changes. gets triggered when onChange event is called. onChange event gets called whenever there is a change in the 
    // user input HTML boxes. [name] refers to the HTML attribute "name" in the forms. value refers to what user inputted. It's updating 
    // form data to have the right inputs
    const handleInput = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    // Handle form submission. When the submit event happens, you have all the information required to create a new user, so do it
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Call the createUser function with the formData
        try {
            const result = await createLeague(formData);
            // Optionally, you can show a success message or redirect the user.
            console.log("League created successfully:", result);
            history("/Dashboard");
        } catch (error) {
            console.error("Error creating League:", error);
            // Handle the error, such as showing an error message to the user.
        }
    };

    
    

    // Pass the required information that the child component should get from the parent (this file) to child (NewUserForm)
    return (
        <div>
            {/* Pass props to the NewUserForm component */}
            <NewLeagueForm
                formData={formData}
                handleInput={handleInput}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default NewLeague;
