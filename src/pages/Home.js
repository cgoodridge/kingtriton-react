import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SpecialMenuList from '../components/SpecialMenuList';
import { Link } from 'react-router-dom';
import '../css/home.css';

const Home = ({food, loading}) => {
  return (
    <section>
        <div className="parallax">
            <Box className="hero-text">
            <Typography gutterBottom variant="h4" component="h2" align="center" className="main-font">
                Welcome to King Triton's Seafood Palace
            </Typography>
            <Button variant="contained" color="secondary" component={Link} to='/reservations' className="heroButton">
                Make a Reservation
            </Button>
            </Box>
        </div>

        <Container maxWidth="lg">
            <Typography gutterBottom variant="h3" component="h3" align="center" className="main-font">
                Take-away Specials
            </Typography>
        </Container>
        <Container maxWidth="xl" className="centered-container">
            <SpecialMenuList foods={food} loading={loading}/>
        </Container>

    </section>
    );
}

export default Home;
