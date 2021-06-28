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
import { Component } from 'react';
// import { Button, Card, Row, Col } from 'react-materialize';


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }




    
    render()
    {
      if(this.props.foodData)
      {
        {console.log(this.props.foodData.food)}

        var food = this.props.foodData.filter(foodData => foodData.special === true ).map(function (food) {
          return(
          
            
              <Grid item xs={12} sm={3}>
                <Card className="card small" style={{borderRadius: "20px"}} key={food.id}>
                    <CardMedia
                    component="img"
                    alt={food.alt}
                    height="225"
                    image={food.image}
                    title={food.name}
                    className="card-image"
                    />
                    <CardContent>
                      <Grid container style={{marginBottom: '10px'}}>
                        <Grid item xs={10}>
                          <Typography gutterBottom variant="h6" component="h2" align="left">
                              {food.name} 
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography gutterBottom variant="h6" component="h2" align="left">
                              ${food.price} 
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions className="controls">
                        <Box className="control-counters">
                            <IconButton size="small" color="primary">
                              <RemoveIcon />
                            </IconButton>
                            <TextField id="filled-basic" className="cardCount" InputProps={{ disableUnderline: true }} defaultValue="1" size="small" />
                            <IconButton size="small" color="primary">
                              <AddIcon />
                            </IconButton>
                        </Box>
                       
                          <Fab color="primary" aria-label="add" >
                              <img src="img/mdi_basket-plus.png"></img>
                          </Fab>
                        
                    </CardActions>
                </Card>
              </Grid>
        
            );
          });
      }
    
      return (
        
        <section>
          <img src="/img/shrimp-dinner.jpg" className="hero-image" style={{filter: 'brightness(20%)'}}></img>
          <Box className="hero-text">
            <Typography gutterBottom variant="h3" component="h2" align="center" className="main-font">
                        Dish of the Week
            </Typography>
            
              <Button variant="contained" color="primary" style={{width: 100}}>
                Order 
              </Button>
            
          </Box>
          <Container maxWidth="lg">
              <Typography gutterBottom variant="h3" component="h2" align="center" className="main-font">
                      Specials
              </Typography>
          </Container>

              <Grid container direction="row" className="grid-content">
              
                {food}

              </Grid>
        </section>
        );
    }
    
}

export default Home;
