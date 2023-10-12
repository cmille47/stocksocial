import React from "react";

const NewUserForm = ({ formData, handleInput, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        LeagueName:
        <input
          type="text"
          name="LeagueName"
          value={formData.LeagueName}
          onChange={handleInput}
        />
      </label>
      <br />
      <label>
        StartingAmount:
        <input
          type="text"
          name="StartingAmount"
          value={formData.StartingAmount}
          onChange={handleInput}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="text"
          name="NumPlaters"
          value={formData.NumPlayers}
          onChange={handleInput}
        />
      </label>
      <br />
      <button type="submit">Create League</button>
    </form>
  );
};

export default NewLeagueForm;
