import React, { useState, useEffect } from "react";
import NewUser from "../NewUser/NewUser"; // Import the ParentComponent component
import UsersList from "./UsersList";
import {getAStock, getAllStocks} from "../../Common/Services/GetStockInfo.js";
import Ticker from "../../Images/Ticker.png";

import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
  }
  from 'mdb-react-ui-kit'

const MainModule = () => {
    return (
        <MDBContainer className="my-5">

        <MDBCard>
            <MDBRow className='g-0'>

            <MDBCol md='6'>
                {/* figured out image, may need some more formatting */}
                <MDBCardImage src={Ticker} alt="Stock Photo" className='rounded-start w-100' style={{height: '100%'}}/>
            </MDBCol>
            <MDBCol md='6'>
                <MDBCardBody className='d-flex flex-column'>

                <div className='d-flex flex-row mt-2'>
                    <MDBIcon fas icon="money-bill-trend-up fa-3x me-3" style={{ color: '#34f000' }}/>
                    <span className="h1 fw-bold mb-0">StockSocial</span>
                </div>

                <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

                    <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
                    <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/>

                <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Login</MDBBtn>
                <a className="small text-muted" href="#!">Forgot password?</a>
                <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="#!" style={{color: '#393f81'}}>Register here</a></p>

                </MDBCardBody>
            </MDBCol>

            </MDBRow>
        </MDBCard>

        </MDBContainer>
    );
};


/*
const MainModule = () => {
    const [stockData, setstockData] = useState([]);

    useEffect(() => {
        getAllStocks().then((data) => {
            console.log(data);
        });
    }, []);

    return (
        <div>
            <div>
                <h1>Welcome to the Main Component</h1>
                <NewUser />
            </div>
            <div style={{marginTop: '10px'}}>
                Current UsersList:
                <UsersList />
            </div>
        </div>
    );
};
*/
export default MainModule;
