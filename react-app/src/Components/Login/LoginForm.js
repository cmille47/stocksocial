import React from "react";

const LoginForm = ({ formData, handleInput, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInput}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInput}
        />
      </label>
      <br />
      <button type="submit">Create User</button>
    </form>
  );
};

export default LoginForm;
