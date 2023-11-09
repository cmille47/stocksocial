// LeagueDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Parse from 'parse'; // Import Parse
import { getLeague } from '../../Common/Services/LeagueService';
import { addUserToLeague } from '../../Common/Services/LeagueService';
import { checkUserInLeague } from '../../Common/Services/LeagueService';

const LeagueDetails = () => {
  const { leagueId } = useParams();
  const [leagueDetails, setLeagueDetails] = useState(null);
  const [isUserInLeague, setIsUserInLeague] = useState(false); // State to track if the user is already in the league

  // Assume you have the user ID stored in your component's state or context
  const userId = '123456789'; // Replace this with the actual user ID

  useEffect(() => {
    // Fetch league details based on the leagueId
    getLeague(leagueId).then((details) => {
      setLeagueDetails(details);

      // Check if the user is already in the league
      const LeagueMembership = Parse.Object.extend('LeagueMembership');
      const membershipQuery = new Parse.Query(LeagueMembership);
      membershipQuery.equalTo('userId', userId);
      membershipQuery.equalTo('leagueId', leagueId);

      membershipQuery.first().then((existingMembership) => {
        setIsUserInLeague(!!existingMembership);
      });
    });
  }, [leagueId, userId]);

  // LeagueDetails.js

const handleJoinButtonClick = async () => {
    try {
      // Fetch the current league details
      const leagueDetails = await getLeague(leagueId);
  
      // Check if there is room to join (current players < max players)
      const currentPlayers = leagueDetails.get('CurrentPlayers');
      const maxPlayers = leagueDetails.get('MaxPlayers');
  
      if (currentPlayers >= maxPlayers) {
        console.log('The league is full. Cannot join.');
        // You can show a message to the user indicating that the league is full.
        return;
      }
  
      // Check if the user is already in the league
      const existingMembership = await checkUserInLeague(userId, leagueId);
  
      if (existingMembership) {
        // User is already in the league
        console.log('User is already in the league');
        return;
      }
  
      // If there is room and the user is not already in the league, join the league
      await addUserToLeague(userId, leagueId);
  
      // Update the state to reflect that the user is now in the league
      setIsUserInLeague(true);
  
      console.log('User added to the league successfully');
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
      <p>Number of Players: {leagueDetails.get('NumPlayers')}</p>
      
      {isUserInLeague ? (
        <p>You are already in this league.</p>
      ) : (
        <button onClick={handleJoinButtonClick}>Join</button>
      )}
      {/* Display other league details */}
    </div>
  );
};

export default LeagueDetails;
