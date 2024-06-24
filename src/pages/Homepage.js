import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box } from '@mui/material';
import styled from 'styled-components';
import imgg from "../assets/img10.png"

const Homepage = ({value}) => {
    console.log("value: ",value)
    
    return (
        
        <StyledContainer>
            <Grid container alignItems={'center'} justifyContent={'center'} spacing={0}>
                <Grid item xs={12} md={6}>
                    <img src={imgg} alt="students" style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledPaper elevation={3} style={{height: '50vh'}}>
                        <StyledTitle style={{fontSize:40}} id='welcomeid'>
                            Welcome to
                            <br />
                            Attendance Management
                            <br />
                            System
                        </StyledTitle>
                        <StyledText>
                            Streamline Attendance management, add students and faculty.
                            Seamlessly track attendance, assess performance, and provide feedback.
                            Access records and communicate effortlessly.
                        </StyledText>
                        <StyledBox>

                            <a className='main-btn' href='/login' id='btn1' style={{border:'1px solid',padding:'5px',borderRadius:'2px'}}>Login Page</a>

                            <StyledText>
                                Don't have an account?{' '}
                                <Link to="/register" style={{color:"#550080"}}>
                                    Sign up
                                </Link>
                            </StyledText>
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  /* font-family: "Manrope"; */
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  /* color: #550080; */
  margin-top: 30px;
  margin-bottom: 30px; 
  letter-spacing: normal;
  line-height: normal;
`;

