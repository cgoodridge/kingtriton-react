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
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import { Button, Card, Row, Col } from 'react-materialize';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  controlCounters: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  formSize:{
    width: 20,
    paddingTop: 0,
    paddingBottom: 0,
    textAlign: 'center'
  },
  cardRadius:{
    borderRadius: 10,
  },
  gridContent:{
    display: 'flex',
    justifyContent: 'start'
  },
  mainFont:{
    fontFamily: 'Poiret One'
  },
  resArea:{
    backgroundColor: '#1e1e1e',
    height: 500,
    marginTop: 16,
    borderRadius: 20
  }
}));

function Reservations() {

  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#2196f3',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

    const cardInfo = [
        {image: "img/mains/shrimpalfredo.jpg", name: "Shrimp Alfredo", price:16,},
        {image: "img/mains/lobster-mac.jpg", name: "Lobster Mac & Cheese", price:22,},
        {image: "img/mains/fried-calamari.jpeg", name: "Fried Calamari", price:16,},
        {image: "img/mains/fried-calamari.jpeg", name: "Fried Calamari", price:16,},

    ];


    return (
        <div className="App" theme={theme} style={{padding: '25px'}}>
          <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
              <Typography gutterBottom variant="h3" component="h2" align="left" className={classes.mainFont}>
                      Make a Reservation
              </Typography>

              <ThemeProvider theme={theme}>
                <Grid container direction="row" className={classes.gridContent}>
                  <Grid item xs={12}>
                      <Grid container>
                          <Grid item xs={3} style={{paddingRight: '20px', paddingBottom: '20px'}}>
                            <TextField 
                              id="standard-basic" 
                              fullWidth 
                              label="Date"                            
                              InputProps={{ 
                                disableUnderline: true,     
                              }}                          
                            />
                          </Grid>
                          <Grid item xs={3} style={{paddingRight: '20px', paddingBottom: '20px'}}>
                            <TextField 
                              id="standard-basic" 
                              fullWidth 
                              label="Time" 
                              color="primary"
                              InputProps={{ 
                                
                                disableUnderline: true,                           
                              }}/>
                          </Grid>
                          <Grid item xs={3} style={{paddingRight: '20px', paddingBottom: '20px'}}>
                            <TextField 
                              id="standard-basic" 
                              fullWidth 
                              label="People" 
                              color="primary"
                              InputProps={{   
                                disableUnderline: true,                           
                              }}
                            />
                          </Grid>
                          <Grid item xs={3} style={{paddingRight: '20px', paddingBottom: '20px'}}>
                            <Button variant="contained" color="primary" style={{width: 100}}>
                              Book
                            </Button>
                          </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </ThemeProvider>

              <Typography gutterBottom variant="h4" component="h2" align="left" className={classes.mainFont}>
                Preferred Seating
              </Typography>
              <Box className={classes.resArea}>

              </Box>
            </Container>
          </ThemeProvider>
        </div>
    );
}

export default Reservations;
