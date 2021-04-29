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
import { AutoInit } from 'materialize-css';
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

  cardRadius:{
    borderRadius: 10,
  },

  gridContent:{
    display: 'flex',
    justifyContent: 'center'
  },
  heroImage:{
    width: "100%",
  },
  heroText:{
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '25%',
    right: '50%',
    top: '30%',
    color: 'white',
    width: '50%'
    
  },
  mainFont:{
    fontFamily: 'Poiret One'
  }
}));

function Home() {

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
        {image: "img/mains/shrimpalfredo.jpg", name: "Shrimp Alfredo", price:16, alt:"Shrimp Alfredo"},
        {image: "img/mains/lobster-mac.jpg", name: "Lobster Mac & Cheese", price:22,alt:"Lobster Mac & Cheese"},
        {image: "img/mains/fried-calamari.jpeg", name: "Fried Calamari", price:16,alt:"Fried Calamari"},
    

    ];

    const renderCard = (card, index) => {
        return(
        
            <Grid item xs={12} sm={3}>
              <Card className="card small" style={{borderRadius: "20px"}} key={index}>
                  <CardMedia
                  component="img"
                  alt={card.alt}
                  height="225"
                  image={card.image}
                  title={card.name}
                  className="card-image"
                  />
                  <CardContent>
                    <Grid container style={{marginBottom: '10px'}}>
                      <Grid item xs={10}>
                        <Typography gutterBottom variant="h6" component="h2" align="left">
                            {card.name} 
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography gutterBottom variant="h6" component="h2" align="left">
                            ${card.price} 
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions className={classes.controls}>
                      <Box className={classes.controlCounters}>
                          <IconButton size="small" color="primary">
                            <RemoveIcon />
                          </IconButton>
                          <TextField id="filled-basic" className="cardCount" InputProps={{ disableUnderline: true }} defaultValue="1" size="small" />
                          <IconButton size="small" color="primary">
                            <AddIcon />
                          </IconButton>
                      </Box>
                      <ThemeProvider theme={theme}>
                        <Fab color="primary" aria-label="add" onClick={this.addToBasket(card)}>
                            <img src="img/mdi_basket-plus.png"></img>
                        </Fab>
                      </ThemeProvider>
                  </CardActions>
              </Card>
            </Grid>

        )
    };

    return (
        <div className="App">

        <img src="/img/shrimp-dinner.jpg" className={classes.heroImage} style={{filter: 'brightness(20%)'}}></img>
        <Box className={classes.heroText}>
          <Typography gutterBottom variant="h3" component="h2" align="center" className={classes.mainFont}>
                      Dish of the Week
          </Typography>
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="primary" style={{width: 100}}>
              Order 
            </Button>
          </ThemeProvider>
        </Box>
        <Container maxWidth="lg">
            <Typography gutterBottom variant="h3" component="h2" align="center" className={classes.mainFont}>
                    Specials
            </Typography>
        </Container>

            <Grid container direction="row" className={classes.gridContent}>
            {cardInfo.map(renderCard)}
            </Grid>

        </div>
    );
}

export default Home;
