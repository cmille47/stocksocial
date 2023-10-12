import React from "react";

const NewLeagueForm = ({ formData, handleInput, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        League Name:
        <input
          type="text"
          name="leagueName"
          value={formData.leagueName}
          onChange={handleInput}
        />
      </label>
      <br />
      <label>
        Starting Amount:
        <input
          type="number"
          name="startingAmount"
          value={formData.StartingAmount}
          onChange={handleInput}
        />
      </label>
      <br />
      <label>
        Number of Players:
        <input
          type="number"
          name="numPlayers"
          value={formData.numPlayers}
          onChange={handleInput}
        />
      </label>
      <br />
      <button type="submit">Create League</button>
    </form>
  );
};

export default NewLeagueForm;
