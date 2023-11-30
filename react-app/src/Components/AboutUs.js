import React from 'react';
import '../Styles/AboutUs.css';  // Import the CSS file





function AboutUs() {
  return (
    <div className="USabout-section">
      <h1>About Us StockSocials Creators</h1>
      {/* <p>Some text about who we are and what we do.</p> */}
      {/* <p>Resize the browser window to see that this page is responsive, by the way.</p> */}

      <h2 style={{ textAlign: 'center' }}>Our Team</h2>
      <div className="USrow">
        <div className="UScolumn">
          <div className="UScard">
            {/* <img src="" alt="Mitchell" style={{ width: '100%' }} /> */}
            <img src="../Images/Mitchell.jpg" alt="Mitchell" style={{ width: '100%' }} />

            <div className="UScontainer">
              <h2>Mitchell Trossen</h2>
              <p className="UStitle">Student A</p>
              <p>Mtrosse2 is from San Diego and at somepoint thats just his personality. He was much cooler with longer hair and hopes to return to that state one day.</p>
              <p>mtrosse2@nd.edu</p>
              {/* <p><button className="USbutton">Contact</button></p> */}
            </div>
          </div>
        </div>

        <div className="UScolumn">
          <div className="UScard">
            {/* <img src="/w3images/team2.jpg" alt="Christian" style={{ width: '100%' }} /> */}
            <img src="../Images/Christian.jpg" alt="Christian" style={{ width: '100%' }} />
            <div className="UScontainer">
              <h2>Christian Miller</h2>
              <p className="UStitle">Student B</p>
              <p>Cmille47 is a fine gentleman from Ohio. He was been a coding protoge since the age of 8. He loves algs, boxing, and driving stick shift. Feel free to ask him about his beautiful jeep</p>
              <p>cmille47@nd.edu</p>
              {/* <p><button className="USbutton">Contact</button></p> */}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AboutUs;
