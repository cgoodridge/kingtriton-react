import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuList from '../components/MenuList';
import Box from '@mui/material/Box';
import Search from '@material-ui/icons/Search';
import '../css/menu.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Dineinmenu from '../components/DineInMenu';


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
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Menu = ({ food, loading }) => {



  const [value, setTabValue] = useState(0);
  const [filterProvider, setFilterParam] = useState('All');
  const [chipColour, setChipColour] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProceedButton = () => {
    setTabValue(1);
  };

  const handleFilterOption = (e) => {
    console.log(e.currentTarget.id);
    setFilterParam(e.currentTarget.id);
    setChipColour(true);
  };

  return (
    <div className="menuContainer">

      <Container maxWidth="lg" style={{ marginTop: '32px' }}>
        <Box sx={{ width: '100%', marginTop: '16px' }}>
          <Box>
            <Tabs value={value} onChange={handleChange} aria-label="me4" centered>
              <Tab label="In House Dining" {...a11yProps(0)} />
              <Tab label="Takeout Menu" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <Dineinmenu foods={food} loading={loading}/>
          </TabPanel>

          <TabPanel value={value} index={1}>
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

            <Grid container direction="row" className="grid-content">
              <MenuList foods={food} loading={loading} filterParam={filterProvider} searchQuery={searchQuery} />
            </Grid>
          </TabPanel>
        </Box>

      </Container>

    </div>
  )

}

export default Menu;
