import React from 'react';
import { Link } from "react-router-dom";
import '../../Styles/NewLeagueForm.css';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  // MDBIcon,
  MDBInput
}
  from 'mdb-react-ui-kit'

const NewLeagueForm = ({ formData, handleInput, handleSubmit }) => {
  return (
      <div className="backgroundStyle2">
          <form handleSubmit={handleSubmit}>
              <MDBContainer className="my-5">
                  <MDBCard className="cardStyle">
                      <MDBRow className='g-0'>
                          <MDBCardBody className='d-flex flex-column'>
                              {/* <div className='d-flex flex-row mt-2'>
                                  <MDBIcon fas icon="money-bill-trend-up fa-3x me-3" style={{ color: '#34f000' }} />
                                  <span className="h1 fw-bold mb-0">StockSocial</span>
                              </div> */}
                              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>May the Best Investor Win</h5>

                              <MDBInput
                                  wrapperClass='mb-4'
                                  label='New League Name'
                                  name="leagueName"
                                  type='text'
                                  size="lg"
                                  value={formData.leagueName}
                                  onChange={handleInput}
                              />
                              <MDBInput
                                  wrapperClass='mb-4'
                                  label='Starting Amount'
                                  name="startingAmount"
                                  type="number"
                                  size="lg"
                                  value={formData.startingAmount}
                                  onChange={handleInput}
                              />
                              <label htmlFor="numPlayers" className="form-label">
                                Number of Players: {formData.numPlayers}
                              </label>
                              <MDBInput
                                  wrapperClass='mb-4'
                                  label=''
                                  name="numPlayers"
                                  type="range"
                                  size="lg"
                                  min="1"
                                  max="10"
                                  value={formData.numPlayers}
                                  onChange={handleInput}
                              />
                              <MDBInput
                                  wrapperClass='mb-4'
                                  label='Your New Portfolio Name'
                                  name="portfolioName"
                                  type="text"
                                  size="lg"
                                  value={formData.portfolioName}
                                  onChange={handleInput}
                              />
                              
                              <MDBBtn className="mb-4 px-5" color="dark" size="lg" onClick={handleSubmit}>Create League</MDBBtn>
                              
                              <p className="mb-5 pb-lg-2">Want to go back? <Link to="/dashboard" style={{ color: '#393f81' }}>Go Back</Link></p>
                          </MDBCardBody>
                      </MDBRow>
                  </MDBCard>
              </MDBContainer>
          </form>
      </div>
  );
};

export default NewLeagueForm;




/*

import React from "react";
import { useNavigate } from 'react-router-dom';
// import '../../Styles/NewLeagueForm.css'; // Import the CSS file

const NewLeagueForm = ({ formData, handleInput, handleSubmit }) => {
const navigate = useNavigate();

return (
  <form onSubmit={handleSubmit}>
    <label>
      League Name:
      <input
        type="text"
        name="leagueName"
        value={formData.leagueName}
        onChange={handleInput}
      />
    </label>
    <br />
    <label>
      Starting Amount:
      <input
        type="number"
        name="startingAmount"
        value={formData.startingAmount}
        onChange={handleInput}
      />
    </label>
    <br />
    <label>
      Number of Players:
      <input
        type="range"
        name="numPlayers"
        min="1"
        max="10"
        value={formData.numPlayers}
        onChange={handleInput}
      />
      {formData.numPlayers}
    </label>
    <br />
    <label>
      Your Portfolio Name:
      <input
        type="text"
        name="portfolioName"
        value={formData.portfolioName}
        onChange={handleInput}
      />
    </label>
    <br />
    <footer>
        <button onClick={() => navigate(-1)}>Back</button>
        <button type="submit">Create League</button>
    </footer>
  </form>
);
};

export default NewLeagueForm;

*/