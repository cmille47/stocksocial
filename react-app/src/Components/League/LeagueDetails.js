// Inside LeagueDetails.js

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Modal from 'react-modal';
import {
  getLeague,
  checkUserInLeague,
  addUserToLeague,
} from '../../Common/Services/LeagueService';
import {
  createNewPortfolio,
  getLeaguePortfolios,
} from '../../Common/Services/PortfolioService';
import { getUserDetails } from '../../Common/Services/AuthService';
import {
  getCurrentNumPlayers,
  getLeaderBoard,
} from '../../Common/Services/LeagueService';
import '../../Styles/LeagueDetails.css';

Modal.setAppElement('#root');

const LeagueDetails = () => {
  const { leagueId } = useParams();
  const [leagueDetails, setLeagueDetails] = useState(null);
  const [isUserInLeague, setIsUserInLeague] = useState(false);
  const [isLeagueFull, setIsLeagueFull] = useState(false);
  const [joinMessage, setJoinMessage] = useState('');
  const [creator, setCreator] = useState(null);
  const [currentPlayers, setCurrentPlayers] = useState(0);
  const [leaguePortfolios, setLeaguePortfolios] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.objectId;

  useEffect(() => {
    const fetchData = async () => {
      const details = await getLeague(leagueId);
      setLeagueDetails(details);

      const existingMembership = await checkUserInLeague(userId, leagueId);
      setIsUserInLeague(!!existingMembership);

      const numPlayers = await getCurrentNumPlayers(leagueId);
      setCurrentPlayers(numPlayers);

      const creatorId = details.get('CreatorID');
      if (creatorId) {
        const user = await getUserDetails(creatorId);
        setCreator(user);
      }

      const portfolios = await getLeaguePortfolios(leagueId);
      setLeaguePortfolios(portfolios);
    };

    fetchData();
  }, [leagueId, userId]);

  useEffect(() => {
    const fetchUserNames = async () => {
      const names = {};
      for (const portfolio of leaguePortfolios) {
        const userId = portfolio.get('UserID');
        const user = await getUserDetails(userId);
        names[userId] = user.get('displayName');
      }
      setUserNames(names);
    };

    if (leaguePortfolios.length > 0) {
      fetchUserNames();
    }
  }, [leaguePortfolios]);

  const handleJoinButtonClick = async () => {
    try {
      const portfolioNameInput = document.getElementById('portfolioName');
      const portfolioName = portfolioNameInput.value;

      if (!portfolioName) {
        console.log('Please enter a portfolio name.');
        return;
      }

      const leagueDetails = await getLeague(leagueId);

      const existingMembership = await checkUserInLeague(userId, leagueId);

      if (existingMembership) {
        console.log('User is already in the league');
        setIsUserInLeague(true);
        return;
      }

      const maxPlayers = leagueDetails.get('NumPlayers');

      if (currentPlayers >= maxPlayers) {
        console.log('The league is full. Cannot join.');
        setIsLeagueFull(true);
        return;
      }

      await addUserToLeague(userId, leagueId);

      setIsUserInLeague(true);
      setJoinMessage('You are now in the league!');

      setCurrentPlayers(currentPlayers + 1);

      await createNewPortfolio(
        userId,
        leagueId,
        leagueDetails.get('StartingAmount'),
        portfolioName
      );

      const updatedPortfolios = await getLeaguePortfolios(leagueId);
      setLeaguePortfolios(updatedPortfolios);
    } catch (error) {
      console.error('Error joining the league', error);
    }
  };

  if (!leagueDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="league-details-container">
      <div className="league-left-side">
        <h3>League Portfolios:</h3>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>UserName</th>
              <th>Portfolio Name</th>
              <th>CurrentValue</th>
            </tr>
          </thead>
          {/* <tbody>
            {leaguePortfolios.map((portfolio, index) => (
              <tr key={portfolio.id}>
                <td>{index + 1}</td>
                <td>{userNames[portfolio.get('UserID')]}</td>
                <td>
                  <Link
                    to={`/portfolio/${encodeURIComponent(
                      portfolio.get('PortfolioName')
                    )}/${portfolio.id}`}
                  >
                    {portfolio.get('PortfolioName')}
                  </Link>
                </td>
                <td>{parseFloat(portfolio.get('currentValue')).toFixed(2)}</td>
              </tr>
            ))}
          </tbody> */}

          <tbody>
          {leaguePortfolios.map((portfolio, index) => (
            <tr key={portfolio.id} className={`rank-${index + 1}`}>
              <td>{index + 1}</td>
              <td>{userNames[portfolio.get('UserID')]}</td>
              <td>
                <Link to={`/portfolio/${encodeURIComponent(portfolio.get('PortfolioName'))}/${portfolio.id}`}>
                  {portfolio.get('PortfolioName')}
                </Link>
              </td>
              <td>{parseFloat(portfolio.get('currentValue')).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>




        </table>
      </div>

      <div className="league-right-side">
        {/* <button onClick={() => setIsModalOpen(true)}>View League Details</button> */}
        <button className="dashboard-right-side league-details-button" onClick={() => setIsModalOpen(true)}>
          View League Details
        </button>


        {/* {isUserInLeague ? (
          <p>{joinMessage || 'You are already in this league.'}</p>
        ) : (
          <>
            {!isLeagueFull ? (
              <>
                <label>
                  Portfolio Name:
                  <input type="text" id="portfolioName" />
                </label>
                
                <button className="dashboard-right-side league-button" onClick={handleJoinButtonClick}>
          Join
        </button>
              </>
            ) : (
              <p>This league is currently full. Cannot join.</p>
            )}
          </>
        )} */}

      {!isUserInLeague ? (
        <>
          {!isLeagueFull ? (
            <>
              <label>
                Portfolio Name:
                <input type="text" id="portfolioName" />
              </label>
              <button className="dashboard-right-side join-league-button" onClick={handleJoinButtonClick}>
                Join
              </button>
            </>
          ) : (
            <p>This league is currently full. Cannot join.</p>
          )}
        </>
      ) : (
        <p>{joinMessage || 'You are already in this league.'}</p>
      )}


      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="League Details"
        style={{
          content: {
            width: '60%', // Set your desired width
            height: '60%', // Set your desired height
            margin: 'auto', // Center the modal horizontally
          },
        }}
      >
        <h2>{leagueDetails.get('LeagueName')} Details</h2>
        <p>Starting Amount: {leagueDetails.get('StartingAmount')}</p>
        <p>Current Players: {currentPlayers}</p>
        <p>Max Players: {leagueDetails.get('NumPlayers')}</p>
        {creator && <p>Created by: {creator.get('displayName')}</p>}
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
        {/* <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="League Details"
        >
          <h2>{leagueDetails.get('LeagueName')} Details</h2>
          <p>Starting Amount: {leagueDetails.get('StartingAmount')}</p>
          <p>Current Players: {currentPlayers}</p>
          <p>Max Players: {leagueDetails.get('NumPlayers')}</p>
          {creator && <p>Created by: {creator.get('displayName')}</p>}

          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </Modal> */}

        
      </div>
    </div>
  );
};

export default LeagueDetails;



/*
// Button working

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Modal from 'react-modal'; // Import Modal from 'react-modal'
import { getLeague, checkUserInLeague, addUserToLeague } from '../../Common/Services/LeagueService';
import { createNewPortfolio, getLeaguePortfolios } from '../../Common/Services/PortfolioService';
import { getUserDetails } from '../../Common/Services/AuthService';
import { getCurrentNumPlayers, getLeaderBoard } from '../../Common/Services/LeagueService'; // Import getLeaderBoard
import '../../Styles/LeagueDetails.css';

Modal.setAppElement('#root'); // Set the root element for accessibility

const LeagueDetails = () => {
  const { leagueId } = useParams();
  const [leagueDetails, setLeagueDetails] = useState(null);
  const [isUserInLeague, setIsUserInLeague] = useState(false);
  const [isLeagueFull, setIsLeagueFull] = useState(false);
  const [joinMessage, setJoinMessage] = useState('');
  const [creator, setCreator] = useState(null);
  const [currentPlayers, setCurrentPlayers] = useState(0);
  const [leaguePortfolios, setLeaguePortfolios] = useState([]);
  const [userNames, setUserNames] = useState({});
  // const [topPortfolios, setTopPortfolios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.objectId;

  useEffect(() => {
    const fetchData = async () => {
      const details = await getLeague(leagueId);
      setLeagueDetails(details);

      const existingMembership = await checkUserInLeague(userId, leagueId);
      setIsUserInLeague(!!existingMembership);

      const numPlayers = await getCurrentNumPlayers(leagueId);
      setCurrentPlayers(numPlayers);

      const creatorId = details.get('CreatorID');
      if (creatorId) {
        const user = await getUserDetails(creatorId);
        setCreator(user);
      }

      const portfolios = await getLeaguePortfolios(leagueId);
      setLeaguePortfolios(portfolios);

      // const topPortfoliosData = await getLeaderBoard(leagueId);
      // setTopPortfolios(topPortfoliosData);
    };

    fetchData();
  }, [leagueId, userId]);

  useEffect(() => {
    const fetchUserNames = async () => {
      const names = {};
      for (const portfolio of leaguePortfolios) {
        const userId = portfolio.get('UserID');
        const user = await getUserDetails(userId);
        names[userId] = user.get('displayName');
      }
      setUserNames(names);
    };

    if (leaguePortfolios.length > 0) {
      fetchUserNames();
    }
  }, [leaguePortfolios]);

  const handleJoinButtonClick = async () => {
    try {
      const portfolioNameInput = document.getElementById('portfolioName');
      const portfolioName = portfolioNameInput.value;

      if (!portfolioName) {
        console.log('Please enter a portfolio name.');
        return;
      }

      const leagueDetails = await getLeague(leagueId);

      const existingMembership = await checkUserInLeague(userId, leagueId);

      if (existingMembership) {
        console.log('User is already in the league');
        setIsUserInLeague(true);
        return;
      }

      const maxPlayers = leagueDetails.get('NumPlayers');

      if (currentPlayers >= maxPlayers) {
        console.log('The league is full. Cannot join.');
        setIsLeagueFull(true);
        return;
      }

      await addUserToLeague(userId, leagueId);

      setIsUserInLeague(true);
      setJoinMessage('You are now in the league!');

      setCurrentPlayers(currentPlayers + 1);

      await createNewPortfolio(userId, leagueId, leagueDetails.get('StartingAmount'), portfolioName);

      const updatedPortfolios = await getLeaguePortfolios(leagueId);
      setLeaguePortfolios(updatedPortfolios);

      // const topPortfoliosData = await getLeaderBoard(leagueId);
      // setTopPortfolios(topPortfoliosData);

      console.log('User added to the league successfully and a new portfolio created');
    } catch (error) {
      console.error('Error joining the league', error);
    }
  };

  if (!leagueDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      

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


      <button onClick={() => setIsModalOpen(true)}>View League Details</button>

   
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="League Details"
      >
        <h2>{leagueDetails.get('LeagueName')} Details</h2>
        <p>Starting Amount: {leagueDetails.get('StartingAmount')}</p>
        <p>Current Players: {currentPlayers}</p>
        <p>Max Players: {leagueDetails.get('NumPlayers')}</p>
        {creator && <p>Created by: {creator.get('displayName')}</p>}

        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>

      <h3>League Portfolios:</h3>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>UserName</th>
            <th>Portfolio Name</th>
            <th>CurrentValue</th>
          </tr>
        </thead>
        <tbody>
          {leaguePortfolios.map((portfolio, index) => (
            <tr key={portfolio.id}>
              <td>{index + 1}</td>
              <td>{userNames[portfolio.get('UserID')]}</td>
              <td>
                <Link
                  to={`/portfolio/${encodeURIComponent(portfolio.get('PortfolioName'))}/${portfolio.id}`}
                >
                  {portfolio.get('PortfolioName')}
                </Link>
              </td>
              <td>{parseFloat(portfolio.get('currentValue')).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  );
};

export default LeagueDetails;

*/

/*
// Original
// Inside LeagueDetails.js

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLeague, checkUserInLeague, addUserToLeague } from '../../Common/Services/LeagueService';
import { createNewPortfolio, getLeaguePortfolios } from '../../Common/Services/PortfolioService';
import { getUserDetails } from '../../Common/Services/AuthService';
import { getCurrentNumPlayers, getLeaderBoard } from '../../Common/Services/LeagueService'; // Import getLeaderBoard
import '../../Styles/LeagueDetails.css';


const LeagueDetails = () => {
  const { leagueId } = useParams();
  const [leagueDetails, setLeagueDetails] = useState(null);
  const [isUserInLeague, setIsUserInLeague] = useState(false);
  const [isLeagueFull, setIsLeagueFull] = useState(false);
  const [joinMessage, setJoinMessage] = useState('');
  const [creator, setCreator] = useState(null); // State to hold the creator's details
  const [currentPlayers, setCurrentPlayers] = useState(0);
  const [leaguePortfolios, setLeaguePortfolios] = useState([]); // State to store league portfolios
  const [userNames, setUserNames] = useState({}); // State to store user names based on UserID
  const [topPortfolios, setTopPortfolios] = useState([]); // State to store top 3 portfolios

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.objectId;

  useEffect(() => {
    // Fetch league details, user membership, and portfolios when the component mounts
    const fetchData = async () => {
      const details = await getLeague(leagueId);
      setLeagueDetails(details);

      const existingMembership = await checkUserInLeague(userId, leagueId);
      setIsUserInLeague(!!existingMembership);

      const numPlayers = await getCurrentNumPlayers(leagueId);
      setCurrentPlayers(numPlayers);

      const creatorId = details.get('CreatorID');
      if (creatorId) {
        const user = await getUserDetails(creatorId);
        setCreator(user);
      }

      const portfolios = await getLeaguePortfolios(leagueId);
      setLeaguePortfolios(portfolios);

      // Fetch top 3 portfolios in the league
      const topPortfoliosData = await getLeaderBoard(leagueId);
      setTopPortfolios(topPortfoliosData);
    };

    fetchData();
  }, [leagueId, userId]);

  useEffect(() => {
    // Fetch user names for all portfolios in the league
    const fetchUserNames = async () => {
      const names = {};
      for (const portfolio of leaguePortfolios) {
        const userId = portfolio.get('UserID');
        const user = await getUserDetails(userId);
        names[userId] = user.get('displayName');
      }
      setUserNames(names);
    };

    if (leaguePortfolios.length > 0) {
      fetchUserNames();
    }
  }, [leaguePortfolios]);

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

      // Fetch updated league portfolios
      const updatedPortfolios = await getLeaguePortfolios(leagueId);
      setLeaguePortfolios(updatedPortfolios);

      // Fetch updated top 3 portfolios in the league
      const topPortfoliosData = await getLeaderBoard(leagueId);
      setTopPortfolios(topPortfoliosData);

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

    
      
      

      <h3>League Portfolios:</h3>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>UserName</th>
            <th>Portfolio Name</th>
            <th>CurrentValue</th>
          </tr>
        </thead>
        <tbody>
          {leaguePortfolios.map((portfolio, index) => (
            <tr key={portfolio.id}>
              <td>{index + 1}</td>
              <td>{userNames[portfolio.get('UserID')]}</td>
              <td>
                <Link to={`/portfolio/${encodeURIComponent(portfolio.get('PortfolioName'))}/${portfolio.id}`}>
                  {portfolio.get('PortfolioName')}
                </Link>
              </td>
              <td>{parseFloat(portfolio.get('currentValue')).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>






  
      


    </div>
  );
};

export default LeagueDetails;

*/

