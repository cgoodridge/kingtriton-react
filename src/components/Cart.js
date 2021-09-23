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
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { createTheme } from '@material-ui/core/styles';

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
  }
}));

function Cart() {

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

    const cardInfo = [
        {image: "img/mains/shrimpalfredo.jpg", name: "Shrimp Alfredo", price:16,},
        {image: "img/mains/lobster-mac.jpg", name: "Lobster Mac & Cheese", price:22,},
        {image: "img/mains/fried-calamari.jpeg", name: "Fried Calamari", price:16,},
        {image: "img/mains/fried-calamari.jpeg", name: "Fried Calamari", price:16,},

    ];

    const renderCard = (card, index) => {
        return(
        
            <Grid item xs={12} sm={3}>
            <Card className="card small" style={{borderRadius: "20px"}} key={index}>
                <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="200"
                image={card.image}
                title="Contemplative Reptile"
                className="card-image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" align="left">
                        {card.name} 
                    </Typography>
                </CardContent>
                <CardActions className={classes.controls}>
                    <Box className={classes.controlCounters}>
                        <IconButton size="small" color="primary">
                        <RemoveIcon />
                        </IconButton>
                        <TextField id="filled-basic" className={classes.formSize} textAlign={'center'} defaultValue="1" size="small" />
                        <IconButton size="small" color="primary">
                        <AddIcon />
                        </IconButton>
                    </Box>
                    <Fab color="primary" aria-label="add">
                        <img src="img/mdi_basket-plus.png"></img>
                    </Fab>
                </CardActions>
            </Card>
            </Grid>

        )
    };

    return (
        <div className="App" theme={theme}>
        <Container maxWidth="lg">
            <Typography gutterBottom variant="h3" component="h2" align="left">
                    Menu
            </Typography>
        </Container>

            <Grid container direction="row" className={classes.gridContent}>
            {cardInfo.map(renderCard)}
            </Grid>

        </div>
    );
}


export default Cart;
