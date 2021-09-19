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
import InputAdornment from '@material-ui/core/InputAdornment';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import MenuList from '../components/MenuList';
import foodList from './food';
import Search from '@material-ui/icons/Search';
import { Component } from 'react';

// import { Button, Card, Row, Col } from 'react-materialize';


const Menu = () => {
    
      return (
        <div>
            
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
                      // startAdornment:(
                      //   <InputAdornment position="end">
                      //     <Search />
                      //   </InputAdornment>
                      // ),
                      disableUnderline: true,                           
                  }}/>
                </Grid>
                
              </Grid>
              
              <Chip
                style={{margin: 4}}
                label="All"
                clickable
                color="secondary"
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
                <MenuList foods={foodList} specialVal={false}/>
              </Grid>
            </Container>

        </div>
      )
 
}

export default Menu;
