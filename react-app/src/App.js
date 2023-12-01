import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css';
import Parse from 'parse';
import Components from "./Components/Components.js";
import Navbar from './Components/NavBar/NavBar';
import StockContext from './Context/StockContext';
import ThemeContext from './Context/ThemeContext';
import { useState } from 'react';

Parse.initialize(
  "CFFw5eAHjZZTRjyaBeNL5d3gPcCsMvuBABU8ihJ9", //APP_ID
  "qNxy0Yirqeh2M1XBicNvxKV9TcR3swF80PXyk9B1", // JAVASCRIPT_KEY
  "PazJuUlwi6iE2IDOFkohbXkRDynJcyaPI74O9ZJ4" // MASTER_KEY
);

Parse.serverURL = 'https://parseapi.back4app.com/';

function App() {
  const [darkMode, setStockData] = useState(true);
  const [stockSymbol, setStockSymbol] = useState('AAPL');

  return (
    <div className="App">
      <ThemeContext.Provider value={{darkMode, setStockData}}>
        <StockContext.Provider value={{stockSymbol, setStockSymbol}}>
          {/* <Navbar /> */}
          <Components />
        </StockContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;

