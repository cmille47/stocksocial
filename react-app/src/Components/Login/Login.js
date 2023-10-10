import React, { useState } from "react";
import { createUser } from "../../Common/Services/UserService"; // Import the createUser function
import LoginForm from "./LoginFormForm";

// Define the parent component
// creating a default formData in parent component
const LoginUser = () => {
    // Define state to store form input values
    const [formData, setFormData] = useState({
        username: "",
        password: "",
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

    // Handle form submission. When the submit event happens, you have all the information required to create a new user, so do it
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Call the createUser function with the formData
        try {
            const result = await LoginUser(formData);
            // Optionally, you can show a success message or redirect the user.
            console.log("User logged in successfully:", result);
        } catch (error) {
            console.error("Error logging in user:", error);
            // Handle the error, such as showing an error message to the user.
        }
    };

    // Pass the required information that the child component should get from the parent (this file) to child (NewUserForm)
    return (
        <div>
            {/* Pass props to the NewUserForm component */}
            <LoginFormForm
                formData={formData}
                handleInput={handleInput}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default NewUser;
