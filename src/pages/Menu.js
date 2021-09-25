import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuList from '../components/MenuList';
import foodList from './food';
import { auth, db } from '../firebaseConfigFile';
import { useStateValue } from '../StateProvider';


// import { Button, Card, Row, Col } from 'react-materialize';


const Menu = ({food}) => {
    
      const [{ cart, user }, dispatch] = useStateValue();
      console.log(food.data);

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
                <MenuList foods={food} specialVal={false}/>
              </Grid>
            </Container>

        </div>
      )
 
}

export default Menu;
