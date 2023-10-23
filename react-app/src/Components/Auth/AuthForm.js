import React, { useEffect } from 'react';
import Ticker from "../../Images/Ticker.png";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


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

const AuthForm = ({ usercreds, onChange, onSubmit }) => {
    const navigate = useNavigate();

    return (
        <div>
            <form onSubmit={onSubmit}>
                <MDBContainer className="my-5">
                    <MDBCard>
                        <MDBRow className='g-0'>
                            <MDBCol md='6'>
                                {/* figured out image, may need some more formatting */}
                                <MDBCardImage src={Ticker} alt="Stock Photo" className='rounded-start w-100' style={{ height: '100%' }} />
                            </MDBCol>
                            <MDBCol md='6'>
                                <MDBCardBody className='d-flex flex-column'>

                                    <div className='d-flex flex-row mt-2'>
                                        <MDBIcon fas icon="money-bill-trend-up fa-3x me-3" style={{ color: '#34f000' }} />
                                        <span className="h1 fw-bold mb-0">StockSocial</span>
                                    </div>

                                    <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                                    <MDBInput
                                        wrapperClass='mb-4'
                                        label='Email address'
                                        name='email'
                                        type='email'
                                        size="lg"
                                        onChange={onChange}
                                    />
                                    <MDBInput
                                        wrapperClass='mb-4'
                                        label='Password'
                                        name='password'
                                        type='password'
                                        size="lg"
                                        onChange={onChange}
                                    />
                                    <MDBBtn className="mb-4 px-5" color="dark" size="lg" onClick={onSubmit}> Login </MDBBtn>
                                    <p className="mb-5 pb-lg-2">Don't have an account? <Link to="/" style={{ color: '#393f81' }}>Register here</Link></p>
                                </MDBCardBody>
                            </MDBCol>

                        </MDBRow>
                    </MDBCard>
                </MDBContainer>
            </form>
        </div>
    );
};

export default AuthForm;
