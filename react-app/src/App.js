




// import logo from './logo.svg';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css';
import Parse from 'parse';
import Components from "./Components/Components.js"

Parse.initialize(
  "CFFw5eAHjZZTRjyaBeNL5d3gPcCsMvuBABU8ihJ9", //APP_ID
  "qNxy0Yirqeh2M1XBicNvxKV9TcR3swF80PXyk9B1", // JAVASCRIPT_KEY
  "PazJuUlwi6iE2IDOFkohbXkRDynJcyaPI74O9ZJ4" // MASTER_KEY
);

Parse.serverURL = 'https://parseapi.back4app.com/';

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Components />
    </div>
  );
}

export default App;

