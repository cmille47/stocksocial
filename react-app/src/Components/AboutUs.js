import React from 'react';
import '../Styles/AboutUs.css';  // Import the CSS file
import Mitchell from "../Images/Mitchell.jpg";
import Christian from "../Images/Christian.jpg"





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
            
            {/* <img src="../Images/Mitchell.jpg" alt="Mitchell" style={{ width: '100%' }} /> */}
            <img
                src={Mitchell}
                alt="Mitchell"
                style={{ width: '100%' }}
                onError={(e) => console.error('Error loading image:', e)}
              />
            <div className="UScontainer">
              <h2>Mitchell Trossen</h2>
              <p className="UStitle">Student A</p>
              <p>Mtrosse2 is from San Diego and it unfortunately shows. He was much cooler with longer hair and hopes to return to that state one day. His dear friend and teammate has taught him stickshift</p>
              <p>mtrosse2@nd.edu</p>
              {/* <p><button className="USbutton">Contact</button></p> */}
            </div>
          </div>
        </div>

        <div className="UScolumn">
          <div className="UScard">
            
            {/* <img src="../Images/Christian.jpg" alt="Christian" style={{ width: '100%' }} /> */}
            <img
                src={Christian}
                alt="Christian"
                style={{ width: '100%' }}
                onError={(e) => console.error('Error loading image:', e)}
              />
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
