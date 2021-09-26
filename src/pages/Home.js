import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MenuList from '../components/MenuList';
import SpecialMenuList from '../components/SpecialMenuList';
import LazyHero from 'react-lazy-hero';
import foodList from './food';


const Home = ({food}) => {


  return (
    
    <section>
      <LazyHero imageSrc="img/bg-image.jpg" parallaxOffset={50} color="#000" minHeight="80vh">
        <Box className="hero-text">
          <Typography gutterBottom variant="h3" component="h2" align="center" className="main-font">
                      Dish of the Week
          </Typography>
          
            <Button variant="contained" color="secondary" className="heroButton">
              Order 
            </Button>
          
        </Box>
      </LazyHero>


      
      <Container maxWidth="lg">
          <Typography gutterBottom variant="h3" component="h2" align="center" className="main-font">
                  Specials
          </Typography>
      </Container>

        <Container maxWidth="lg">
          <Grid container direction="row" className="grid-content"> 
              <SpecialMenuList foods={food}/>
          </Grid>
        </Container>
          
    </section>
    );
}



export default Home;
