// Inside LeagueDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLeague, checkUserInLeague, addUserToLeague } from '../../Common/Services/LeagueService';
import { createNewPortfolio } from '../../Common/Services/PortfolioService';
import { getUserDetails } from '../../Common/Services/AuthService';
import { getCurrentNumPlayers } from '../../Common/Services/LeagueService';

const LeagueDetails = () => {
  const { leagueId } = useParams();
  const [leagueDetails, setLeagueDetails] = useState(null);
  const [isUserInLeague, setIsUserInLeague] = useState(false);
  const [isLeagueFull, setIsLeagueFull] = useState(false);
  const [joinMessage, setJoinMessage] = useState('');
  const [creator, setCreator] = useState(null); // State to hold the creator's details
  const [currentPlayers, setCurrentPlayers] = useState(0);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.objectId;

  useEffect(() => {
    getLeague(leagueId).then((details) => {
      if (details) {
        setLeagueDetails(details);

        // Check if the user is already in the league
        checkUserInLeague(userId, leagueId).then((existingMembership) => {
          setIsUserInLeague(!!existingMembership);
        });

        // Fetch the current number of players
        getCurrentNumPlayers(leagueId).then((numPlayers) => {
          setCurrentPlayers(numPlayers);
        });

        const creatorId = details.get('CreatorID');
        if (creatorId) {
          getUserDetails(creatorId).then((user) => {
            setCreator(user);
          });
        }
      }
    });
  }, [leagueId, userId]);

  const handleJoinButtonClick = async () => {
    try {
      const portfolioNameInput = document.getElementById('portfolioName');
      const portfolioName = portfolioNameInput.value;

      if (!portfolioName) {
        console.log('Please enter a portfolio name.');
        return;
      }

      // Fetch the current league details
      const leagueDetails = await getLeague(leagueId);

      // Check if the user is already in the league
      const existingMembership = await checkUserInLeague(userId, leagueId);

      if (existingMembership) {
        // User is already in the league
        console.log('User is already in the league');
        setIsUserInLeague(true);
        return;
      }

      // Check if there is room to join (current players < max players)
      const maxPlayers = leagueDetails.get('NumPlayers');

      if (currentPlayers >= maxPlayers) {
        console.log('The league is full. Cannot join.');
        setIsLeagueFull(true);
        return;
      }

      // If there is room and the user is not already in the league, join the league
      await addUserToLeague(userId, leagueId);

      // Update the state to reflect that the user is now in the league
      setIsUserInLeague(true);
      setJoinMessage('You are now in the league!');

      // Increment the currentPlayers state
      setCurrentPlayers(currentPlayers + 1);

      // Create a new portfolio associated with the joined league
      await createNewPortfolio(userId, leagueId, leagueDetails.get('StartingAmount'), portfolioName);

      console.log('User added to the league successfully and a new portfolio created');
    } catch (error) {
      console.error('Error joining the league', error);
      // Handle the error, such as showing an error message to the user.
    }
  };

  if (!leagueDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{leagueDetails.get('LeagueName')} Details</h2>
      <p>Starting Amount: {leagueDetails.get('StartingAmount')}</p>
      <p>Current Players: {currentPlayers}</p>
      <p>Max Players: {leagueDetails.get('NumPlayers')}</p>
  
      {creator && (
        <p>Created by: {creator.get('displayName')}</p>
      )}
  
      {isUserInLeague ? (
        <p>{joinMessage || 'You are already in this league.'}</p>
      ) : (
        <>
          {!isLeagueFull ? (
            <>
              <label>
                Portfolio Name:
                <input type="text" id="portfolioName" />
              </label>
              <button onClick={handleJoinButtonClick}>Join</button>
            </>
          ) : (
            <p>This league is currently full. Cannot join.</p>
          )}
        </>
      )}
      {/* Display other league details */}
    </div>
  );
};

export default LeagueDetails;
