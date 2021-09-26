import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuList from '../components/MenuList';
import foodList from './food';
import { auth, db } from '../firebaseConfigFile';
import ListItem from '@mui/material/ListItem';
import { useStateValue } from '../StateProvider';
import Radio from '@mui/material/Radio';
import MenuItem from '@mui/material/MenuItem';


// import { Button, Card, Row, Col } from 'react-materialize';


const Menu = ({food}) => {
  
      const filters = [
          {
            value: 'All',
            label: 'All',
          },
          {
            value: 'main',
            label: 'Mains',
          },
          {
            value: 'appetizer',
            label: 'Appetizer',
          },
          {
            value: 'drinks',
            label: 'Drinks',
          },
          {
            value: 'desserts',
            label: 'Desserts',
          },
      ];

      const [{ cart, user }, dispatch] = useStateValue();
      const [filterProvider, setFilterParam] = useState('All');
      const [chipColor, setChipColour] = useState('All');


      const [selectedValue, setSelectedValue] = useState('a');

      const handleChange = (event) => {
        setSelectedValue(event.target.value);
        console.log(selectedValue);
      };

      /// TODO: Find a more dynamic way to do this

      /*
      const handleAllChipClick = () => {
        console.info('You clicked the All Chip.');
        setFilterParam('All');
        console.log(filter);
      };
      const handleStarterChipClick = () => {
        console.info('You clicked the starter Chip.');
        setFilterParam('Starter');
        console.log(filter);
      };
      const handleMainChipClick = () => {
        console.info('You clicked the main Chip.');
        setFilterParam('Main');
        console.log(filter);
      };
      const handleDessertChipClick = () => {
        console.info('You clicked the dessert Chip.');
        setFilterParam('Dessert');
        console.log(filter);
      };
      const handleDrinkChipClick = () => {
        console.info('You clicked the drink Chip.');
        setFilterParam('Drink');
        console.log(filter);
      };
      */

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
              <ListItem>

              </ListItem>

              {/* <Chip
                style={{margin: 4}}
                label="All"
                clickable
                onChange={handleChange}
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
                value="main"
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
              /> */}
              <TextField
                  id="standard-select-filter-type"
                  select
                  required
                  // fullWidth
                  value={filterProvider} 
                  onChange={e => setFilterParam(e.target.value)}
                  label="Filter"
                  variant="standard"
              >
              {filters.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
              ))}
              </TextField>
              <Grid container direction="row" className="grid-content">
                <MenuList foods={food} filterParam={filterProvider}/>
              </Grid>
            </Container>

        </div>
      )
 
}

export default Menu;
