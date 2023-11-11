import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLeague, checkUserInLeague, addUserToLeague } from '../../Common/Services/LeagueService';
import { getUserDetails } from '../../Common/Services/AuthService';

const LeagueDetails = () => {
  const { leagueId } = useParams();
  const [leagueDetails, setLeagueDetails] = useState(null);
  const [isUserInLeague, setIsUserInLeague] = useState(false);
  const [creator, setCreator] = useState(null); // State to hold the creator's details

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
  
        const creatorId = details.get('CreatorID');
        if (creatorId) {
          getUserDetails(creatorId).then((user) => {
            setCreator(user);
          });
        }
      }
    });
  }, [leagueId, userId]);
  
  /*
  useEffect(() => {
    getLeague(leagueId).then((details) => {
      setLeagueDetails(details);

      // Check if the user is already in the league
      checkUserInLeague(userId, leagueId).then((existingMembership) => {
        setIsUserInLeague(!!existingMembership);
      });

      const creatorId = details.get('CreatorID');
      getUserDetails(creatorId).then((user) => {
        setCreator(user);
      });
    });
  }, [leagueId, userId]); // Ensure userId is included in the dependency array for useEffect
  */
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

      {creator && (
        <p>Created by: {creator.get('displayName')}</p>
      )}

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
