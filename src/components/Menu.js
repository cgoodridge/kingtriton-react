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
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import { Component } from 'react';

// import { Button, Card, Row, Col } from 'react-materialize';


class Menu extends Component {

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

      var food = this.props.foodData.map(function (food) {
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
        <div className="App"  style={{padding: '25px'}}>
          
            <Container maxWidth="lg">
              <Grid container>
                <Grid item xs={12} sm={9}> 
                  <Typography gutterBottom variant="h3" component="h2" align="left" className="main-font">
                            Menu
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField 
                    id="standard-basic" 
                    fullWidth 
                    label="Search" 
                    color="primary"
                    InputProps={{ 
                      
                      disableUnderline: true,                           
                  }}/>
                </Grid>
                
              </Grid>
              
              <Chip
                style={{margin: 4}}
                label="All"
                clickable
                color="primary"
              />
              <Chip
                style={{margin: 4}}
                label="Appetizers"
                clickable
                color="#010101"
              />
              <Chip
                style={{margin: 4}}
                label="Mains"
                clickable
                color="#010101"
              />
              <Chip
                style={{margin: 4}}
                label="Cocktails"
                clickable
                color="#010101"
              />
              <Chip
                style={{margin: 4}}
                label="Desserts"
                clickable
                color="#010101"
              />
            
              <Grid container direction="row" className="grid-content">
                {food}
              </Grid>
            </Container>

        </div>
      );
  }
}

export default Menu;
