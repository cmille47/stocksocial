# stocksocial
Mitchell and Christian app for Modern Web Dev

## Setup
### Local Setup
1) Ensure a version of node is installed
2) git clone this repo
3) go to react-app folder
4) install all packages/dependencies using npm install

## Running the App
To run the app, simply follow the create-react-app instructions which can be found [here](https://github.com/cmille47/stocksocial/blob/main/react-app/README.md)
This will create a localhost enviornment where you can interact with the app. 

## Checking User Stories
There are 6 user stories that you can verify on this app: 

### 1. User Sees Realtime Stock Data When Viewing a Stock
As a logged in user, view one of your portfolio's from the Dashboard. If no portfolios appear, join a league and create a corresponding portfolio. Either view portfolio from the league page or go back to the Dashboard and click on 'View Portfolio' there. Once viewing a portfolio, search for stocks utilizing the search bar. Click one that is of interest to you. This will take you to the positions/{stockTicker} page where you should see realtime stock data.

### 2. User Can Create New Positions
Navigate to a portfolio the you own. Search for a stock. Click 'Open Position' button on positon page. Enter quantity desired. Submit purchase. If successful, navigate back to the portfolio page where you should see position recorded under 'Active Positions'.  

### 3. User Positions/Portfolios Update on Login
Record one of your portfolios record its current value. Navigate to the league page the portfolio is in. Ensure the current values are the same. Do the same for the portfolio page. To see position/portfolio updates, it is required for you to own a position. Once one is owned, record the current positon value displayed on the portfolio page. Wait a few minutes. Return to the Dashboard page. View the portfolio again and there should be (depending on market updates) a different position value
and different portfolio value. 

### 4. Users Should Be Able To Search Available Leagues to Join
As a logged in user, there is a searchbar in the top right corner for leagues. Type in 'Both'. This will display the league link with the matching name. Click on link. If not already in this league, there will be a join button in the top right corner.

### 5. Users Should Be Able To See Charts Describing Their Position in Their Leagues
As a logged in user with portfolios, click on one of the portfolios. Click on the League Name. User should see a leaderboard chart detailing who is currently leading the league.

### 6. Developers Should have the backend database update Portfolios, Leagues, and LeagueMembership when creating or joining a league
When you join a league all the proper backend classes are updated accordingly

### 7. (In excel google form, meant to say user). User should have a personalized Dashboard
Users can complete story number 4 on the Dashboard, can see their portfolios, and their leagues.

// As we implemented our stories, we did slight modifications as well as added others. There was some overlap stories so we felt it was necessary to add some more to demonstrate our knowledge.

