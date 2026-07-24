import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SpecialMenuList from '../components/SpecialMenuList';
import LazyHero from 'react-lazy-hero';
import { Link } from 'react-router-dom';

const Home = ({food, loading}) => {
  return (
    <section>
      <LazyHero imageSrc="img/res-1.jpg" parallaxOffset={50} color="#000" minHeight="80vh">
        <Box className="hero-text">
          <Typography gutterBottom variant="h4" component="h2" align="center" className="main-font">
                Welcome to King Triton's Seafood Palace
          </Typography>
            <Button variant="contained" color="secondary" component={Link} to='/reservations' className="heroButton">
              Make a Reservation
            </Button>
        </Box>
      </LazyHero>

      <Container maxWidth="lg">
          <Typography gutterBottom variant="h3" component="h3" align="center" className="main-font">
                Take-away Specials
          </Typography>
      </Container>
        <Container maxWidth="lg">
          <Grid container direction="row" className="grid-content">
              <SpecialMenuList foods={food} loading={loading}/>
          </Grid>
        </Container>

    </section>
    );
}

export default Home;
