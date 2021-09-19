//  import logo from './logo.svg';

import React from 'react';
import ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import MenuList from '../components/MenuList';
import LazyHero from 'react-lazy-hero';

import foodList from './food';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Component } from 'react';
// import { Button, Card, Row, Col } from 'react-materialize';


const Home = () => {

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
              <MenuList foods={foodList} specialVal={true}/>
          </Grid>
        </Container>
          
    </section>
    );
}



export default Home;
