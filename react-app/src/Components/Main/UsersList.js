import React, { useEffect, useState} from "react";
import {
    getAllUsers,
    getUser
} from "../../Common/Services/UserService.js";
import {
    getAllFriends,
    getUserFriends
} from "../../Common/Services/FriendsService.js";
import {
    getLeague
} from "../../Common/Services/LeagueService.js";
import {
    getLeagueMembers,
    getUserLeagues
} from "../../Common/Services/UserToLeaguesService.js";
import {
    getAllUserPortfolios,
    getPortolio,
    getUserLeaguePortolio,
    getLeaguePortoflios
} from "../../Common/Services/PortolioService.js";
import {
    getPortolioPositions
} from "../../Common/Services/PositionService.js";


// I am using this file primarily for testing
// purposes of our 'services'
const UsersList = () => {
    // constant for testing
    const [userID, setUserID] = useState('RGI6NZnNSq');
    const [leagueID, setLeagueID] = useState('YqKbHpIjz1');
    const [portfolioID, setPortfolioID] = useState('1NSxHIOXI4');

    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [userFriends, setUserFriends] = useState([]);
    const [userLeagues, setUserLeagues] = useState([]);
    const [leagueMembers, setLeagueMembers] = useState([]);
    const [league, setLeague] = useState(null);
    const [portfolio, setPortfolio] = useState(null);
    const [userPortfolios, setUserPortfolios] = useState([]);
    const [userLeaguePortfolio, setUserLeaguePortfolio] = useState(null);
    const [leaguePortfolios, setLeaguePortfolios] = useState([]);
    const [positions, setPositions] = useState([]);


    useEffect(() => {
        getAllUsers().then((users) => {
            setUsers(users);
        });
        // getPortolioPositions(portfolioID).then((positions) => {
        //     setPositions(positions);
        // });
        // getPortolio(portfolioID).then((portfolio) => {
        //     setPortfolio(portfolio);
        // });
        // getUserLeaguePortolio(userID, leagueID).then((portfolio) => {
        //     setUserLeaguePortfolio(portfolio);
        // });
        // getAllUserPortfolios(userID).then((portfolios) => {
        //     setUserPortfolios(portfolios);
        // });
        // getLeaguePortoflios(leagueID).then((portfolios) => {
        //     setLeaguePortfolios(portfolios);
        // });
        // getUserLeagues(userID).then((leagues) => {
        //     setUserLeagues(leagues);
        // });
        // getLeagueMembers(leagueID).then((members) => {
        //     setLeagueMembers(members);
        // });
        // getLeague(leagueID).then((league) => {
        //     setLeague(league);
        // });
        // getAllFriends().then((friends) => {
        //     setFriends(friends);
        // });
        // getUserFriends(userID).then((friends) => {
        //     setUserFriends(friends);
        // });
    }, []);


    // this is a test of our functionality
    // get a leauge, then get all members ID, then get all members info from users
    // useEffect(() => {
    //     leagueMembers.forEach((member) => {
    //         getUser(member.get('UserID')).then((user) => {
    //             console.log('UsersInLeague: (leagueID, userID, username): ', 
    //             member.get('LeagueID'), member.get('UserID'), user.get('displayName'));
    //         });
    //     });
    // }, [leagueMembers]);

    useEffect(() => {

        // console.log('positions: ', positions);
        // console.log('portfolio: ', portfolio);
        // console.log('userLeaguePortfolio: ', userLeaguePortfolio);
        // console.log('userPortfolios: ', userPortfolios);
        // console.log('leaguePortfolios: ', leaguePortfolios);
        // console.log('user_leagues:', userLeagues);
        // console.log('league_members:');
        // leagueMembers.forEach((member) => {
        //     console.log(member.get('UserID'));
        // });
        // if (league !== null) { // cannot fetch attributs unless object is defined
        //     console.log('league:', league.get('LeagueName'));
        // };
        // console.log(users);
        // console.log('friends:', friends);
        // console.log('user friends:', userFriends);

    }, [users, friends, userFriends, userLeagues,
         leagueMembers, league, portfolio, userPortfolios, 
         userLeaguePortfolio, leaguePortfolios, positions]);
        
    return (
        <div>
            This is the users list.
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.get("username")}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;