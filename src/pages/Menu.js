import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuList from '../components/MenuList';
import { useStateValue } from '../StateProvider';
import MenuItem from '@mui/material/MenuItem';
import Search from '@material-ui/icons/Search';
import '../css/menu.css';


// import { Button, Card, Row, Col } from 'react-materialize';

const chipValues = [
  {
    title: "All",
    id: "All"
  },
  {
    title: "Mains",
    id: "main"
  },
  {
    title: "Appetizers",
    id: "appetizer"
  },
  {
    title: "Cocktails",
    id: "drinks"
  },
  {
    title: "Desserts",
    id: "dessert"
  },
];

const Menu = ({ food, loading }) => {



  const [filterProvider, setFilterParam] = useState('All');
  const [chipColour, setChipColour] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedValue, setSelectedValue] = useState('a');

  const handleFilterOption = (e) => {
    console.log(e.currentTarget.id);
    setFilterParam(e.currentTarget.id);
    setChipColour(true);
  };

  return (
    <div>

      <Container maxWidth="lg" style={{ marginTop: '32px' }}>
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
              variant="standard"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }} />
          </Grid>

        </Grid>

        {chipValues.map((chip, index) => (
          <Chip
            key={index}
            style={{ margin: 4 }}
            label={chip.title}
            id={chip.id}
            clickable
            onClick={handleFilterOption}
            color={chipColour && filterProvider === chip.id ? "secondary" : "#010101"}
          />
        ))}

        {/* <Chip
          style={{ margin: 4 }}
          label="All"
          id="All"
          clickable
          onClick={handleFilterOption}
          color={chipColour ? "secondary" : "#010101"}
        />
        <Chip
          style={{ margin: 4 }}
          label="Appetizers"
          id="appetizer"
          clickable
          onClick={handleFilterOption}
          color={chipColour ? "secondary" : "#010101"}
        />
        <Chip
          style={{ margin: 4 }}
          label="Mains"
          id="main"
          clickable
          onClick={handleFilterOption}
          color={chipColour ? "secondary" : "#010101"}
        />
        <Chip
          style={{ margin: 4 }}
          label="Cocktails"
          id="drinks"
          clickable
          onClick={handleFilterOption}
          color={chipColour ? "secondary" : "#010101"}
        />
        <Chip
          style={{ margin: 4 }}
          label="Desserts"
          id="dessert"
          clickable
          onClick={handleFilterOption}
          color={chipColour ? "secondary" : "#010101"}
        /> */}

        {/* <TextField
          id="standard-select-filter-type"
          select
          className="filterForm"
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
        </TextField> */}
        <Grid container direction="row" className="grid-content">
          <MenuList foods={food} loading={loading} filterParam={filterProvider} searchQuery={searchQuery} />
        </Grid>
      </Container>

    </div>
  )

}

export default Menu;
