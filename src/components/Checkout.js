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
import Container from '@material-ui/core/Container';
import Subtotal from "./Subtotal";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { createTheme } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ClassNames } from '@emotion/react';
import { useStateValue } from '../StateProvider';
import CheckoutItem from './CheckoutItem';
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

  contentPadding:{
    paddingTop: '16px',
    paddingBottom: '16px',
  },
  cardPadding: {
    paddingRight: '8px',
    paddingLeft: '8px'
  }
}));



const Checkout = () => {

  const [{ cart }, dispatch] = useStateValue();

  const classes = useStyles();
  const theme = createTheme({
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

   

    
    return (
        <div className="App" theme={theme}>
          <Container maxWidth="lg">
              <Grid container direction="row"  className={classes.contentPadding}>
                <Grid container direction="column" item xs={6} className={classes.gridContent}>
                  {cart.map(item => (
                    console.log(item),
                    <CheckoutItem food={item}/>
                  ))}
                </Grid>
                <Grid item xs={6} alignItems="flex-start" className={classes.gridContent}>
                  <Subtotal/>
                </Grid>
              </Grid>
              
          </Container>
        </div>
    );
}

export default Checkout;
