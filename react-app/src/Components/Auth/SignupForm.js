import React from 'react';
import { Link } from "react-router-dom";
import '../../Styles/Signup.css';

import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBIcon,
    MDBInput
}
    from 'mdb-react-ui-kit'

const SignupForm = ({ onChange, onSubmit }) => {
    return (
        <div className="backgroundStyle">
            <form onSubmit={onSubmit}>
                <MDBContainer className="my-5">
                    <MDBCard className="cardStyle">
                        <MDBRow className='g-0'>
                            <MDBCardBody className='d-flex flex-column'>
                                <div className='d-flex flex-row mt-2'>
                                    <MDBIcon fas icon="money-bill-trend-up fa-3x me-3" style={{ color: '#34f000' }} />
                                    <span className="h1 fw-bold mb-0">StockSocial</span>
                                </div>
                                <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Create an account</h5>

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='First Name'
                                    name='firstname'
                                    type='text'
                                    size="lg"
                                    onChange={onChange}
                                />
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Last Name'
                                    name='lastname'
                                    type='text'
                                    size="lg"
                                    onChange={onChange}
                                />
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
                                    label='Username'
                                    name='username'
                                    type='text'
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
                                <MDBBtn className="mb-4 px-5" color="dark" size="lg" onClick={onSubmit}>Sign Up</MDBBtn>
                                <p className="mb-5 pb-lg-2">Already have an account? <Link to="/" style={{ color: '#393f81' }}>Sign In</Link></p>
                            </MDBCardBody>
                        </MDBRow>
                    </MDBCard>
                </MDBContainer>
            </form>
        </div>
    );
};

export default SignupForm;