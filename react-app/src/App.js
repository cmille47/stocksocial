import logo from './logo.svg';
import './App.css';
import Parse from 'parse';
import Components from "./Components/Components.js"

Parse.initialize(
  "1yhC2skdeFM9dAYY5a015F8Ltb3rOxcwYuTgzSUv", //APP_ID
  "xqCZeFbORWoNcYSVyrTxtP1sPpynqjYkLB2HZyhY", // JAVASCRIPT_KEY
  "VtPJ6uAlQSUcepIzcwwO5RQ6MsWxs5Up6Qr56aGU" // MASTER_KEY
);

Parse.serverURL = 'https://parseapi.back4app.com/';

function App() {
  return (
    <div className="App">
      <Components />
    </div>
  );
}

export default App;
