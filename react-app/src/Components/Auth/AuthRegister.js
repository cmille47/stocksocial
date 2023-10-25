import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from "../../Common/Services/AuthService";
import SignupForm from "./SignupForm";

const AuthRegister = () => {

  const history = useNavigate();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: ''
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission. When the submit event happens, you have all the information required to create a new user, so do it
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await createUser(formData);
      console.log("User created successfully:", result);
      localStorage.setItem('user', JSON.stringify(result));
      history('/dashboard') // navigate to dashboard on successful creation
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <SignupForm
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthRegister;
