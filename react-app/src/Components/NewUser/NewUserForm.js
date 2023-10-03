import React from "react";

const NewUserForm = ({ formData, handleInput, handleSubmit }) => {
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
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInput}
        />
      </label>
      <br />
      <label>
        Display Name:
        <input
          type="text"
          name="displayName"
          value={formData.displayName}
          onChange={handleInput}
        />
      </label>
      <br />
      <button type="submit">Create User</button>
    </form>
  );
};

export default NewUserForm;
