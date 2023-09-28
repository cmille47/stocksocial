import logo from './logo.svg';
import './App.css';
const Parse = require('parse');
import Parse from 'parse';

Parse.initialize(
  "1yhC2skdeFM9dAYY5a015F8Ltb3rOxcwYuTgzSUv", //APP_ID
  "xqCZeFbORWoNcYSVyrTxtP1sPpynqjYkLB2HZyhY", // JAVASCRIPT_KEY
  "VtPJ6uAlQSUcepIzcwwO5RQ6MsWxs5Up6Qr56aGU" // MASTER_KEY
);

Parse.serverURL = 'https://parseapi.back4app.com/';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
