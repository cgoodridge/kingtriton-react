//  import logo from './logo.svg';

import React from 'react';
import ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
    justifyContent: 'center'
  },
  mainFont:{
    fontFamily: 'Poiret One'
  }
}));

function About() {

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
        {image: "img/owner.jpg", name: "Barbara Gordon", position:"Owner, King Triton's Seafood Palace",},
        {image: "img/head-chef.jpg", name: "Sara Lance", position:"Head Chef, King Triton's Seafood Palace",},
        {image: "img/sous-chef.jpg", name: "Lucius Fox", position:"Sous Chef, King Triton's Seafood Palace",},
        

    ];

    const renderCard = (card, index) => {
        return(
        
            <Grid item xs={12} sm={3}>
            <Card className="card small" style={{borderRadius: "20px"}} key={index}>
                <CardMedia
                component="img"
                alt={card.position}
                height="200"
                image={card.image}
                title={card.owner}
                className="card-image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="h2" align="center" style={{fontFamily: 'Poiret One', fontWeight: 'bold'}}>
                        {card.name} 
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2" align="center">
                        {card.position} 
                    </Typography>
                </CardContent>
                <CardActions className={classes.controls}>
                    
                        <IconButton size="small" color="primary">
                          <a href="#"><FontAwesomeIcon icon={['fab','linkedin']} size="lg" /></a>
                        </IconButton>
                    
        
                </CardActions>
            </Card>
            </Grid>

        )
    };

    return (
        <div className="App" theme={theme} style={{padding: '25px'}}>
        <Container maxWidth="lg">
            <Typography gutterBottom variant="h3" component="h2" align="left" className={classes.mainFont} >
                    About
            </Typography>
            <Typography variant="body1" gutterBottom style={{lineHeight: 2}}>
              King Triton’s Seafood Palace “Food fit for a king” was founded in 1999. 
              King Triton’s gets its name from the 1989 Disney movie, The Little Mermaid, a movie the owner’s son loved as a child. 
              Barbara Gordon originally opened her first espresso, doughnut and sandwich shop and when that proved to be a fruitful business venture, she expanded and rebranded to what is now known as King Triton’s Seafood Palace. 
              It has turned into the best Seafood Restaurant in Barbados, serving in excess of 300,000 meals and 299,000. Furthermore, presently it’s additionally in Barbados located at Hastings Christ Church. At King Triton's Seafood Palace Barbados, you can appreciate a wide variety of seafood delights, espresso, drinks, and sandwiches, that will have you sipping’, slurping, gorgin and more.
            </Typography>
        </Container>

            <Grid container direction="row" className={classes.gridContent}>
            {cardInfo.map(renderCard)}
            </Grid>

        </div>
    );
}

export default About;
