



# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).
 
## [0.3.0] - 2023-12-08
 
Here we write upgrading notes for brands. It's a team effort to make them as
straightforward as possible.
 
### Added
- [StockSocial-2023] Card.js - Groups stock info.
- [StockSocial-2023] Chart.js - Charts the stock history for user convenience.
- [StockSocial-2023] Details.js - Provides the stock details and company information.
- [StockSocial-2023] Header.js - A header displaying remaining cash.
- [StockSocial-2023] Overview.js - Overview of stock
- [StockSocial-2023] Position.js - Displays the information of the position and allows the buying and selling of positions.
- [StockSocial-2023] SaleButton.js - Actual code for buying and selling.
- [StockSocial-2023] APIContext.js - Deals with API calling. Contains flag that uses mock data or real data. Allows us to perserve API calls.
- [StockSocial-2023] Navbar.js - Used bootstrap to create a NavBar that can take oyu to your dashboard, the about us page, or logout.
- [StockSocial-2023] LogoutButton.js - Allows the user to logout by clearing local storage.
- [StockSocial-2023] AboutUs - A page to add some humor to our website and tell the user a little about the creators.


 
### Changed
- [StockSocial-2023] Components - just added more proper routing.
- [StockSocial-2023] Images - Added more background images
- [StockSocial-2023] Styling - Added more files for proper styling
- [StockSocial-2023] DashboardGood.js - Component for dashboard. Has a new leaderboard and bootstrap styling. From the dashboard you can go to either a specific league or specific portfolio. All old features remained.
- [StockSocial-2023] Portfolio.js - Added styling. Can now click on the portfolio positions to see more details about the specific position.
- [StockSocial-2023] README - added user stories and instructions on how to use application.
- [StockSocial-2023] LeagueDetails.js - has a correct ordering leader board now that displays the portfolio current values. Also some nice styling.
 
### Fixed
- [StockSocial-2023] PortfolioService.js - Going portfolio only if user exists and is correct one. Also when a portfolio is created when creating/joining a league the default current value is now the league starting amount of cash.
- [StockSocial-2023] Components.js - Cleaning up naming conventions
- [StockSocial-2023] SearchPositions - Fixed bugs so it correctly retrieves positions
- [StockSocial-2023] NewLeagueForm - just added styling and that when you create a league you have to create a portfolio within that league.






_______________________________________________________________________________________________________________

# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).
 
## [0.3.0] - 2023-11-08
 
Here we write upgrading notes for brands. It's a team effort to make them as
straightforward as possible.
 
### Added
- [StockSocial-2023] ProtectedRoute.js - Does the appropriate routing. serves as a wrapper for other components
- [StockSocial-2023] DashboardGood.js - Component for dashboard. Has button to create a league, display user info, and list their portfolios
- [StockSocial-2023] DashboardHome.js - container for protected route component. ensures only valid users can access dashboard


 
### Changed
- [StockSocial-2023] Login Component - changed the name from Login components to Auth. Auth checks users authenticity
- [StockSocial-2023] Login Service - changed the name from Login services to Auth. Auth checks users authenticity
- [StockSocial-2023] Portfolio Service - Getting protfolio only if user exists and is correct one. Added Security
- [StockSocial-2023] AuthFrom - added a visually appealing and secure login form
- [StockSocial-2023] AuthLogin - parent component for auth loging in
- [StockSocial-2023] AuthRegister - Parent component for auth signing up
- [StockSocial-2023] SignUpForm - added a visually appealing sign up form
- [StockSocial-2023] Portfolio - storing and fetching user portfolio info into/from local storage
- [StockSocial-2023] Components - just added proper routing
 
### Fixed
- [StockSocial-2023] Login (AUTH) Components - It's updated
- [StockSocial-2023] SignUP (AUTH) Component - It's updated
- [StockSocial-2023] Portfolio.js - fixed to utilize local storage
- [StockSocial-2023] Images - It's updated to include our current images
- [StockSocial-2023] Styles - It's updated to include our current styles




_______________________________________________________________________________________________________________
# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).
 
## [0.2.0] - 2023-10-13
 
Here we write upgrading notes for brands. It's a team effort to make them as
straightforward as possible.
 
### Added
- [StockSocial-2023] Dashboard Component - A page that will display all of users info
- [StockSocial-2023] Login Component - login sutff. Not actually utilized yet
- [StockSocial-2023] League Component - Create leagues and display the leagues you are in
- [StockSocial-2023] NewLeague Form - create league
- [StockSocial-2023] Friend Service - Manage the friends data
- [StockSocial-2023] GetStockInfo Service - API work
- [StockSocial-2023] League Service - Manage League data
- [StockSocial-2023] Portfolio Service - Manage Portfolio data
- [StockSocial-2023] Position Service - Manage Position data
- [StockSocial-2023] UsertoLeague Service - Manage relations between users and leagues and respective data
- [StockSocial-2023] Ticker.png - Image for cover page
 
### Changed
- [StockSocial-2023] Main Component - changed the style. doesn't do auth yet
- [StockSocial-2023] User Service - Manage user data
- [StockSocial-2023] NewUser Form - fixed bugs 
- [StockSocial-2023] Components.js - Added Routing
 
### Fixed
- [StockSocial-2023] Main Component - It's updated
- [StockSocial-2023] App Component - It's updated

